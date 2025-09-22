package com.cosmostarot.plugin.payment;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeParams;
import com.android.billingclient.api.ConsumeResponseListener;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.SkuDetails;
import com.android.billingclient.api.SkuDetailsParams;
import com.android.billingclient.api.SkuDetailsResponseListener;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import java.util.Arrays;
import java.util.List;

@NativePlugin(
    requestCodes = {123} // 결제 요청 코드
)
public class PaymentProfilePlugin extends Plugin implements PurchasesUpdatedListener {
    private static final String TAG = "PaymentProfilePlugin";
    private BillingClient billingClient;
    private PluginCall savedCall;

    @Override
    public void load() {
        // 플러그인 로드 시 초기화
        setupBillingClient();
    }

    private void setupBillingClient() {
        Activity activity = getActivity();
        billingClient = BillingClient.newBuilder(activity)
                .setListener(this)
                .enablePendingPurchases()
                .build();
    }

    @PluginMethod
    public void initializePayment(final PluginCall call) {
        String accountId = call.getString("accountId", "");
        
        // 기존 연결 종료
        if (billingClient != null && billingClient.isReady()) {
            billingClient.endConnection();
        }
        
        // 새 빌링 클라이언트 설정
        setupBillingClient();
        
        // 계정 ID로 결제 프로필 설정
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    Log.d(TAG, "결제 시스템 연결 성공");
                    JSObject ret = new JSObject();
                    ret.put("connected", true);
                    call.resolve(ret);
                } else {
                    Log.e(TAG, "결제 시스템 연결 실패: " + billingResult.getResponseCode());
                    call.reject("결제 시스템 연결 실패", String.valueOf(billingResult.getResponseCode()));
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                Log.e(TAG, "결제 서비스 연결 끊김");
                call.reject("결제 서비스 연결 끊김");
            }
        });
    }

    @PluginMethod
    public void purchaseItem(final PluginCall call) {
        savedCall = call;
        String productId = call.getString("productId");
        String accountId = call.getString("accountId", "");
        
        if (productId == null) {
            call.reject("상품 ID가 필요합니다");
            return;
        }
        
        // 결제 프로필 설정을 위한 빌더
        BillingFlowParams.Builder builder = BillingFlowParams.newBuilder();
        
        // 계정 ID 설정 (결제 프로필 지정)
        if (!accountId.isEmpty()) {
            builder.setObfuscatedAccountId(accountId);
        }
        
        // 스키마 정보 가져오기
        SkuDetailsParams skuDetailsParams = SkuDetailsParams.newBuilder()
                .setSkusList(Arrays.asList(productId))
                .setType(BillingClient.SkuType.INAPP)
                .build();
                
        billingClient.querySkuDetailsAsync(skuDetailsParams, new SkuDetailsResponseListener() {
            @Override
            public void onSkuDetailsResponse(BillingResult result, List<SkuDetails> skuDetailsList) {
                if (result.getResponseCode() == BillingClient.BillingResponseCode.OK && skuDetailsList != null && !skuDetailsList.isEmpty()) {
                    // 상품 정보를 파라미터에 추가
                    BillingFlowParams flowParams = builder
                            .setSkuDetails(skuDetailsList.get(0))
                            .build();
                    
                    // 결제 화면 시작 (여기서 계정 선택 가능)
                    billingClient.launchBillingFlow(getActivity(), flowParams);
                } else {
                    call.reject("상품 정보를 가져올 수 없습니다");
                }
            }
        });
    }

    @Override
    public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
        if (savedCall == null) {
            return;
        }

        if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK && purchases != null) {
            // 구매 성공
            Purchase purchase = purchases.get(0);
            
            // 구매 정보 반환
            JSObject purchaseInfo = new JSObject();
            purchaseInfo.put("orderId", purchase.getOrderId());
            purchaseInfo.put("purchaseToken", purchase.getPurchaseToken());
            purchaseInfo.put("accountId", purchase.getAccountIdentifiers());
            
            savedCall.resolve(purchaseInfo);
            
            // 소모성 아이템인 경우 소비 처리
            ConsumeParams consumeParams = ConsumeParams.newBuilder()
                    .setPurchaseToken(purchase.getPurchaseToken())
                    .build();
                    
            billingClient.consumeAsync(consumeParams, new ConsumeResponseListener() {
                @Override
                public void onConsumeResponse(BillingResult billingResult, String purchaseToken) {
                    Log.d(TAG, "아이템 소비 완료: " + purchaseToken);
                }
            });
        } else {
            // 구매 실패
            savedCall.reject("구매 실패: " + billingResult.getResponseCode());
        }
        
        savedCall = null;
    }

    @PluginMethod
    public void switchAccount(PluginCall call) {
        // 결제 계정 전환을 위해 기존 연결 종료 후 재연결
        String newAccountId = call.getString("accountId", "");
        
        if (billingClient != null) {
            billingClient.endConnection();
        }
        
        initializePayment(call);
    }
}