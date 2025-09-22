const { store, ProductType, Platform } = window.CdvPurchase;
const platform =
  Capacitor.getPlatform() === 'android'
    ? Platform?.GOOGLE_PLAY
    : Platform?.APPLE_APPSTORE;
const productIds = ['a', 'b', 'c'];
const InAppPurchase = ({
  updateRefundPolicyOpen,
  updatePriceInfoModalOpen,
  userIn,
  isPriceInfoModalOpen,
  showInAppPurchase,
  setShowInAppPurchase,
  setUnavailableItem,
  ...props
}) => {
  const [iapProducts, setIapProducts] = useState([]);
  const [purchasing, setPurchasing] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false);
  const [user] = useState(userIn || {});
  const [processedTransactions, setProcessedTransactions] = useState(new Set());
  const [isConfirmClicked, setConfirmClicked] = useState(false);
  const [requiredItemName, serRequiredItemName] = useState(prev => {
    if (props?.requiredItemInfo?.name === 1) return '아이템1';
    if (props?.requiredItemInfo?.name === 2) return '아이템2';
    if (props?.requiredItemInfo?.name === 3) return '아이템3';
  });
  let debounceTimer = null;
  const socketRef = useRef();
  const initializeStore = () => {
    store.verbosity = store.DEBUG;
    productIds.forEach(productId => {
      store.register({
        type: ProductType.CONSUMABLE,
        id: productId,
        platform: platform,
      });
    });
    store.initialize([platform]);
  };
  const restorePurchases = async () => {
    try {
      await store.restorePurchases();
      console.log('Purchases restored successfully');
    } catch (error) {
      console.error('Error restoring purchases:', error);
    }
  };
  const sendPurchaseToServer = useCallback(
    async receipt => {
      const transactionId = receipt.sourceReceipt.transactions[0].transactionId;
      const productId = receipt.sourceReceipt.transactions[0].products[0].id;
      if (processedTransactions.has(transactionId)) {
        return;
      }
      if (!productIds.includes(productId)) {
        return;
      }
      try {
        const response = await chargeApi.postPaymentForGooglePlayStore({
          email: user?.email,
          className: receipt.className,
          id: receipt.id,
          sourceReceiptClassName: receipt.sourceReceipt.className,
          transactionId: receipt.sourceReceipt.transactions[0].transactionId,
          state: receipt.sourceReceipt.transactions[0].state,
          products: receipt.sourceReceipt.transactions[0].products,
          productId: receipt.sourceReceipt.transactions[0].products[0].id,
          platform: receipt.sourceReceipt.transactions[0].platform,
          orderId: receipt.sourceReceipt.transactions[0].nativePurchase.orderId,
          packageName:
            receipt.sourceReceipt.transactions[0].nativePurchase.packageName,
          purchaseTime:
            receipt.sourceReceipt.transactions[0].nativePurchase.purchaseTime,
          purchaseState:
            receipt.sourceReceipt.transactions[0].nativePurchase.purchaseState,
          purchaseToken:
            receipt.sourceReceipt.transactions[0].nativePurchase.purchaseToken,
          quantity:
            receipt.sourceReceipt.transactions[0].nativePurchase.quantity,
          acknowledged:
            receipt.sourceReceipt.transactions[0].nativePurchase.acknowledged,
          getPurchaseState:
            receipt.sourceReceipt.transactions[0].nativePurchase
              .getPurchaseState,
          autoRenewing:
            receipt.sourceReceipt.transactions[0].nativePurchase.autoRenewing,
          purchaseId: receipt.sourceReceipt.transactions[0].purchaseId,
          purchaseDate: receipt.sourceReceipt.transactions[0].purchaseDate,
          isPending: receipt.sourceReceipt.transactions[0].isPending,
          isAcknowledged: receipt.sourceReceipt.transactions[0].isAcknowledged,
          renewalIntent: receipt.sourceReceipt.transactions[0].renewalIntent,
          sourcePlatform: receipt.sourceReceipt.platform,
          sourcePurchaseToken: receipt.sourceReceipt.purchaseToken,
          sourceOrderId: receipt.sourceReceipt.orderId,
          collection: receipt.collection,
          latestReceipt: receipt.latestReceipt,
          nativeTransactions: receipt.nativeTransactions,
          validationDate: receipt.validationDate,
        });
        setProcessedTransactions(prev => new Set(prev).add(transactionId));
        return response;
      } catch (error) {
        console.error('Error sending purchase to server:', error);
        throw error;
      }
    },
    [processedTransactions]
  );
  const refreshUI = useCallback(async () => {
    const products = await Promise.all(
      productIds.map(productId =>
        store.get(productId, platform, ProductType.CONSUMABLE)
      )
    );
    setIapProducts(products);
  }, []);
  const finishPurchase = useCallback(
    async receipt => {
      if (isProcessingPurchase) return;
      setIsProcessingPurchase(true);
      try {
        const transactionId =
          receipt.sourceReceipt.transactions[0].transactionId;
        if (processedTransactions.has(transactionId)) {
          console.log('Transaction already processed:', transactionId);
          setIsProcessingPurchase(false);
          return;
        }
        const result = await sendPurchaseToServer(receipt);
        if (result.response.success === true) {
          await receipt.finish();
          console.log('Purchase completed and consumed');
          await refreshUI();
          setProcessedTransactions(prev => new Set(prev).add(transactionId));
          window.location.reload();
        }
      } catch (error) {
        console.error('Error finishing purchase:', error);
      } finally {
        setPurchasing(false);
        setIsProcessingPurchase(false);
        refreshUI();
      }
    },
    [isProcessingPurchase, sendPurchaseToServer, processedTransactions]
  );
  const orderProduct = useCallback(
    product => {
      if (isOrdering) return;
      setIsOrdering(true);
      const order = async () => {
        try {
          if (!user?.email) {
            alert(
              'Please log in with Google OAuth to proceed with the purchase.'
            );
            setIsOrdering(false);
            return;
          }
          alert(
            `You are logged in as ${user.email}. Ensure your Google Play account matches this email for the purchase.`
          );
          if (product?.getOffer()) {
            await product.getOffer().order(); 
          } else {
            throw new Error('Product offer not available');
          }
        } catch (error) {
          console.error('Purchase error:', error);
        } finally {
          setIsOrdering(false);
        }
      };
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(order, 500);
    },
    [isOrdering, user?.email]
  );
  const removeRefundedItem = useCallback(async productId => {
    try {
      console.log(`Refund for ${productId} processed`);
    } catch (error) {
      console.error('Error processing refund:', error);
    }
  }, []);
  const handleReceipts = useCallback(async receipts => {
    for (let receipt of receipts) {
      for (let transaction of receipt.transactions) {
        if (transaction.state === store.TRANSACTION_STATE_REFUNDED) {
          console.log(`Product ${transaction.productId} has been refunded`);
          await removeRefundedItem(transaction.productId);
        }
      }
    }
  }, []);
  useEffect(() => {
    initializeStore();
    restorePurchases();
    socketRef.current = socketIOClient('https:
      transports: ['websocket'],
      upgrade: false,
    });
    socketRef.current.on('refundProcessed', orderId => {
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [
    props?.whichMode,
    props?.country,
    props?.isAdsWatched,
    props?.answerForm,
  ]);
  useEffect(() => {
    if (showInAppPurchase) {
      setIsOrdering(false);
      setPurchasing(false);
      refreshUI();
    }
  }, [showInAppPurchase]);
  useEffect(() => {
    store.when().productUpdated(refreshUI),
      store.when().approved(transaction => {
        transaction.verify();
        transaction.finish();
      });
    store.when().verified(finishPurchase);
    store.when().unverified(() => setPurchasing(false));
    store.when().receiptsReady(handleReceipts);
    return () => {
      store.off();
    };
  }, []);
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  const fetchedItemBox = itemBox();
  const openChargePage = () => {
    setConfirmClicked(true);
  };
  const closeChargeModal = () => {
    setShowInAppPurchase(false);
  };
  const formatPrice = useCallback(
    (priceMicros, currencyCode) => {
      if (!priceMicros || !currencyCode) return 'Price not available';
      const priceInUnits = priceMicros / 1000000;
      if (currencyCode === 'KRW') {
        const wholePart = Math.floor(priceInUnits);
        const fractionalPart = priceInUnits - wholePart;
        if (fractionalPart === 0) {
          return new Intl.NumberFormat(browserLanguage, {
            style: 'currency',
            currency: 'KRW',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(wholePart);
        } else {
          return `${new Intl.NumberFormat(browserLanguage, {
            style: 'currency',
            currency: 'KRW',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(wholePart)}.${(fractionalPart * 100)
            .toFixed(0)
            .padStart(2, '0')}`;
        }
      } else {
        return new Intl.NumberFormat(browserLanguage, {
          style: 'currency',
          currency: currencyCode,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(priceInUnits);
      }
    },
    [browserLanguage]
  );
  const holdingItemForAds = async user => {
    let type =
      IS_PRODUCTION_MODE && isNormalAccount(user) ? 'Item' : 'coins';
    const rewardOfUser = await getRewardForPreference(type, user?.email);
    props?.setAdsReward(prev => {
      if (rewardOfUser === null) return 0;
      return rewardOfUser;
    });
  };
  useEffect(() => {
    holdingItemForAds(user);
  }, [user?.email, purchasing]);
  return (
    <>
      <div className={`${styles['backdrop']}`} />
      {isPriceInfoModalOpen === true && isConfirmClicked === true && (
        <PriceInfoModal
          updatePriceInfoModalOpen={updatePriceInfoModalOpen}
          itemBox={fetchedItemBox}
        />
      )}
      {isConfirmClicked === true && (
        <Card className={styles['purchase-modal']}>
          <header className={styles['charge-content']}>
            <div className={styles['empty']}></div>
            <div className={styles['item-box']}>
              {(props?.isItemModeOn ||
                props?.whichMode !== 2) && (
                <div key={'ads'} className={styles['item']}>
                  <div className={styles['item-info-box']}>
                    <h2
                      className={`${styles['item-title']} ${styles['ads-card']}`}
                    >
                      {t('title.ads')}
                    </h2>
                    <p className={styles['item-description']}>
                      {t('instruction.ads-item')}
                    </p>
                  </div>
                  <div className={styles['item-button-box']}>
                    <Button
                      className={`${styles['owned-item-for-ads']} ${
                        browserLanguage === 'ja'
                          ? styles['line-height-ja']
                          : styles['line-height-ko-and-en']
                      }`}
                    >
                      {props?.admobReward} {t('unit.ea')}
                    </Button>
                    <Button
                      className={styles['item-button']}
                      onClick={() => {
                        try {
                          setPurchasing(true);
                          if (
                            props?.setAdsWatched !== undefined &&
                            props?.setAdsWatched !== null
                          )
                            props?.setAdsWatched(false);
                          if (
                            props?.setWhichAds !== undefined &&
                            props?.setWhichAds !== null
                          )
                            props?.setWhichAds(2);
                        } catch (e) {
                        } finally {
                          setPurchasing(false);
                        }
                      }}
                      disabled={purchasing}
                    >
                      {purchasing ? t('button.loading') : t('button.view-ads')}
                    </Button>
                  </div>
                </div>
              )}
              {iapProducts.map((product, i) => {
                return (
                  <div key={product?.id} className={styles['item']}>
                    <div className={styles['item-info-box']}>
                      <ItemTitle
                        product={product}
                        browserLanguage={browserLanguage}
                        styles={styles}
                      />
                      <ItemDescription
                        product={product}
                        styles={styles}
                        t={t}
                      />
                    </div>
                    <div className={styles['item-button-box']}>
                      <p className={styles['item-price']}>
                        {formatPrice(
                          product?.pricing?.priceMicros,
                          product?.pricing?.currency
                        )}
                      </p>
                      <Button
                        className={styles['item-button']}
                        onClick={() => {
                          orderProduct(product);
                        }}
                        disabled={purchasing}
                      >
                        {purchasing
                          ? t('button.loading')
                          : t('button.purchase')}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles['empty']}></div>
          </header>
          <footer className={styles['purchase-button-box']}>
            <CancelButton
              className={styles['purchase-button']}
              onClick={(e = null) => {
                setConfirmClicked(false);
                closeChargeModal();
              }}
            >
              {t('button.close')}
            </CancelButton>
          </footer>
        </Card>
      )}
      {isConfirmClicked === false && (
        <Card className={styles['modal']}>
          <header
            className={`${
              browserLanguage === 'ja'
                ? styles['title-japanese']
                : styles['title']
            }`}
          >
            <p>{t(`alert_modal.notice`)}</p>
          </header>
          <div
            className={`${
              browserLanguage === 'ja'
                ? styles['modal-content-japanese']
                : styles['modal-content']
            }`}
          >
            <p>{props?.children}</p>
            {props?.requiredItemInfo && (
              <p>{`${t(`item.required-item`)}  : ${requiredItemName}${t(
                `unit.kind-of-item`
              )} x ${
                props?.requiredItemInfo?.requiredAmount -
                props?.requiredItemInfo?.remainingAmount
              }${t(`unit.ea`)}`}</p>
            )}
            {props?.requiredItemInfo && (
              <p>{`${t(`item.remaining-item`)} : ${
                props?.requiredItemInfo?.remainingAmount
              } ${t(`unit.ea`)}`}</p>
            )}
          </div>
          <footer className={styles['purchase-button-box']}>
            <Button
              className={styles['purchase-button']}
              onClick={() => {
                openChargePage();
              }}
            >
              {t(`button.confirm`)}
            </Button>
            <CancelButton
              className={styles['purchase-button']}
              onClick={(e = null) => {
                closeChargeModal();
              }}
            >
              {t(`button.close`)}
            </CancelButton>
          </footer>
        </Card>
      )}
    </>
  );
};
export default InAppPurchase;
