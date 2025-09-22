import React from 'react';
import styles from './_MyPagePage.module.scss';
import { RankBadge } from '../../components/RankBadge/RankBadge';
const MyPagePage = () => {
  const userData = {
    name: '김철수',
    id: 'user123',
    isVip: true,
    totalSpent: 125000,
    vipThreshold: 150000,
  };
  const tickets = [
    { type: '1장권', count: 3, color: 'blue' },
    { type: '3장권', count: 2, color: 'green' },
    { type: '5장권', count: 1, color: 'purple' },
    { type: '7장권', count: 0, color: 'orange' },
    { type: '10장권', count: 1, color: 'red' },
    { type: '13장권', count: 0, color: 'indigo' },
    { type: 'ads free권', count: 2, color: 'yellow' },
  ];
  const vipProgress = (userData.totalSpent / userData.vipThreshold) * 100;
  return (
    <div className={styles.mypage}>
      <div className={styles.container}>
        {}
        <div className={styles.header}>
          <h1>마이페이지</h1>
          <p>나의 정보와 이용권을 한눈에 확인하세요</p>
        </div>
        {}
        <div className={`${styles.card} ${styles['user-info']}`}>
          <div className={styles['card-header']}>
            <div className={styles['card-title']}>
              <User size={24} />
              사용자 정보
            </div>
          </div>
          <div className={styles['card-content']}>
            <div className={styles['user-details']}>
              <div className={styles['user-text']}>
                <div className={styles['user-name']}>
                  <h2>{userData.name}</h2>
                  <RankBadge userInfo={userData} size={16} />
                </div>
                <p>ID: {userData.id}</p>
              </div>
              <div className={styles['user-icon']}>
                <User size={48} />
              </div>
            </div>
          </div>
        </div>
        {}
        <div className={`${styles.card} ${styles.tickets}`}>
          <div className={styles['card-header']}>
            <div className={styles['card-title']}>
              <CreditCard size={24} />
              보유 이용권
            </div>
          </div>
          <div className={styles['card-content']}>
            <div className={styles['ticket-grid']}>
              {tickets.map((ticket, index) => (
                <div key={index} className={styles.ticket}>
                  <div
                    className={`${styles['ticket-type']} ${
                      styles[ticket.color]
                    }`}
                  >
                    {ticket.type}
                  </div>
                  <div className={styles['ticket-count']}>{ticket.count}</div>
                  <div className={styles['ticket-unit']}>장</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {}
        <div className={styles.stats}>
          <div className={`${styles.card} ${styles.purchase}`}>
            <div className={styles['card-header']}>
              <div className={styles['card-title']}>
                <TrendingUp size={24} />
                구매 실적
              </div>
            </div>
            <div className={styles['card-content']}>
              <div className={styles.amount}>
                <div className={styles.total}>
                  {userData.totalSpent.toLocaleString()}원
                </div>
                <div className={styles.label}>총 구매 금액</div>
              </div>
              <div className={styles.monthly}>
                <div className={styles.row}>
                  <span>이번 달 구매</span>
                  <span>45,000원</span>
                </div>
                <div className={styles.row}>
                  <span>지난 달 구매</span>
                  <span>32,000원</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.card} ${styles['vip-progress']}`}>
            <div className={styles['card-header']}>
              <RankBadge userInfo={userData} size={24}>
                VIP 진행률
              </RankBadge>
            </div>
            <div className={styles['card-content']}>
              <div className={styles.progress}>
                <div className={styles.percentage}>
                  {Math.round(vipProgress)}%
                </div>
                <div className={styles.label}>VIP 달성까지</div>
              </div>
              <div className={styles['progress-bar']}>
                <div className={styles.bar}>
                  <div
                    className={styles.fill}
                    style={{ width: `${Math.min(vipProgress, 100)}%` }}
                  ></div>
                </div>
                <div className={styles.values}>
                  <span>{userData.totalSpent.toLocaleString()}원</span>
                  <span>{userData.vipThreshold.toLocaleString()}원</span>
                </div>
                <div className={styles.status}>
                  {userData.isVip
                    ? 'VIP 등급 유지 중입니다!'
                    : `${(
                        userData.vipThreshold - userData.totalSpent
                      ).toLocaleString()}원 더 구매하면 VIP!`}
                </div>
              </div>
            </div>
          </div>
        </div>
        {}
        <div className={`${styles.card} ${styles['extra-info']}`}>
          <div className={styles['card-content']}>
            <div className={styles['info-grid']}>
              <div className={`${styles['info-box']} ${styles.blue}`}>
                <div className={styles.value}>12</div>
                <div className={styles.label}>이번 달 이용</div>
              </div>
              <div className={`${styles['info-box']} ${styles.green}`}>
                <div className={styles.value}>89</div>
                <div className={styles.label}>총 이용 횟수</div>
              </div>
              <div className={`${styles['info-box']} ${styles.purple}`}>
                <div className={styles.value}>7</div>
                <div className={styles.label}>연속 이용 일</div>
              </div>
              {}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPagePage;
