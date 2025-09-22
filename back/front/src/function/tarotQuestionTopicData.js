import { useTranslation } from 'react-i18next';
import {
  isMonthAgo,
  isWeekAgo,
  isDayAgo,
  isWithinThisMonth,
  isWithinThisWeek,
  isWithinThisDay,
} from './isTimeAgo.js';
import { formattingDate } from './formattingDate.jsx';
import useLanguageChange from '../hooks/useEffect/useLanguageChange.jsx';
export const TotalMajorCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      const questionTopic = tarot?.questionInfo['question_topic'];
      if (questionTopic !== questionTopicForRender) return 0;
      const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
      if (
        formattedDate !== dateForRender &&
        dateForRender !== t(`chart.statistics-total`)
      )
        return 0;
      const majorCount = tarot?.spreadInfo?.selectedTarotCardsArr
        ?.map((card) => {
          const major = card.split(' ').map((word) => {
            if (
              ['Pentacles', 'Swords', 'Cups', 'Wands'].includes(word) !== true
            ) {
              return 1;
            }
          });
          let result = 0;
          if (major.includes(undefined)) {
            result = 0;
          } else {
            result = 1;
          }
          return result;
        })
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      return majorCount;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const TotalMinorCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      const questionTopic = tarot?.questionInfo['question_topic'];
      if (questionTopic !== questionTopicForRender) return 0;
      const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
      if (
        formattedDate !== dateForRender &&
        dateForRender !== t(`chart.statistics-total`)
      )
        return 0;
      const minorCount = tarot?.spreadInfo?.selectedTarotCardsArr
        ?.map((card) => {
          const minor = card.split(' ').map((word) => {
            if (
              ['Pentacles', 'Swords', 'Cups', 'Wands'].includes(word) === true
            )
              return 1;
          });
          let result = 0;
          if (minor.includes(1)) {
            result = 1;
          } else {
            result = 0;
          }
          return result;
        })
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      return minorCount;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const MonthlyMajorCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const majorCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const major = card.split(' ').map((word) => {
              if (
                ['Pentacles', 'Swords', 'Cups', 'Wands'].includes(word) !== true
              )
                return 1;
            });
            let result = 0;
            if (major.includes(undefined)) {
              result = 0;
            } else {
              result = 1;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return majorCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const MonthlyMinorCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const minorCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const minor = card.split(' ').map((word) => {
              if (
                ['Pentacles', 'Swords', 'Cups', 'Wands'].includes(word) === true
              )
                return 1;
            });
            let result = 0;
            if (minor.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return minorCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const WeeklyMajorCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const majorCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const major = card.split(' ').map((word) => {
              if (
                ['Pentacles', 'Swords', 'Cups', 'Wands'].includes(word) !== true
              )
                return 1;
            });
            let result = 0;
            if (major.includes(undefined)) {
              result = 0;
            } else {
              result = 1;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return majorCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const WeeklyMinorCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const minorCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const minor = card.split(' ').map((word) => {
              if (
                ['Pentacles', 'Swords', 'Cups', 'Wands'].includes(word) === true
              )
                return 1;
            });
            let result = 0;
            if (minor.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return minorCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const DailyMajorCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const majorCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const major = card.split(' ').map((word) => {
              if (
                ['Pentacles', 'Swords', 'Cups', 'Wands'].includes(word) !== true
              )
                return 1;
            });
            let result = 0;
            if (major.includes(undefined)) {
              result = 0;
            } else {
              result = 1;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return majorCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const DailyMinorCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const minorCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const minor = card.split(' ').map((word) => {
              if (
                ['Pentacles', 'Swords', 'Cups', 'Wands'].includes(word) === true
              )
                return 1;
            });
            let result = 0;
            if (minor.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return minorCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const TotalCupsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      const questionTopic = tarot?.questionInfo['question_topic'];
      if (questionTopic !== questionTopicForRender) return 0;
      const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
      if (
        formattedDate !== dateForRender &&
        dateForRender !== t(`chart.statistics-total`)
      )
        return 0;
      const cupsCount = tarot?.spreadInfo?.selectedTarotCardsArr
        ?.map((card) => {
          const cups = card.split(' ').map((word) => {
            if (['Cups'].includes(word) === true) return 1;
          });
          let result = 0;
          if (cups.includes(1)) {
            result = 1;
          } else {
            result = 0;
          }
          return result;
        })
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      return cupsCount;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const TotalSwordsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      const questionTopic = tarot?.questionInfo['question_topic'];
      if (questionTopic !== questionTopicForRender) return 0;
      const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
      if (
        formattedDate !== dateForRender &&
        dateForRender !== t(`chart.statistics-total`)
      )
        return 0;
      const swordsCount = tarot?.spreadInfo?.selectedTarotCardsArr
        ?.map((card) => {
          const swords = card.split(' ').map((word) => {
            if (['Swords'].includes(word) === true) return 1;
          });
          let result = 0;
          if (swords.includes(1)) {
            result = 1;
          } else {
            result = 0;
          }
          return result;
        })
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      return swordsCount;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const TotalWandsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      const questionTopic = tarot?.questionInfo['question_topic'];
      if (questionTopic !== questionTopicForRender) return 0;
      const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
      if (
        formattedDate !== dateForRender &&
        dateForRender !== t(`chart.statistics-total`)
      )
        return 0;
      const wandsCount = tarot?.spreadInfo?.selectedTarotCardsArr
        ?.map((card) => {
          const wands = card.split(' ').map((word) => {
            if (['Wands'].includes(word) === true) return 1;
          });
          let result = 0;
          if (wands.includes(1)) {
            result = 1;
          } else {
            result = 0;
          }
          return result;
        })
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      return wandsCount;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const TotalPentaclesCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      const questionTopic = tarot?.questionInfo['question_topic'];
      if (questionTopic !== questionTopicForRender) return 0;
      const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
      if (
        formattedDate !== dateForRender &&
        dateForRender !== t(`chart.statistics-total`)
      )
        return 0;
      const pentaclesCount = tarot?.spreadInfo?.selectedTarotCardsArr
        ?.map((card) => {
          const pentacles = card.split(' ').map((word) => {
            if (['Pentacles'].includes(word) === true) return 1;
          });
          let result = 0;
          if (pentacles.includes(1)) {
            result = 1;
          } else {
            result = 0;
          }
          return result;
        })
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      return pentaclesCount;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const MonthlyCupsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const cupsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const cups = card.split(' ').map((word) => {
              if (['Cups'].includes(word) === true) return 1;
            });
            let result = 0;
            if (cups.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return cupsCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const MonthlySwordsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const swordsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const swords = card.split(' ').map((word) => {
              if (['Swords'].includes(word) === true) return 1;
            });
            let result = 0;
            if (swords.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return swordsCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const MonthlyWandsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const wandsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const wands = card.split(' ').map((word) => {
              if (['Wands'].includes(word) === true) return 1;
            });
            let result = 0;
            if (wands.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return wandsCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const MonthlyPentaclesCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const pentaclesCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const pentacles = card.split(' ').map((word) => {
              if (['Pentacles'].includes(word) === true) return 1;
            });
            let result = 0;
            if (pentacles.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return pentaclesCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const WeeklyCupsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const cupsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const cups = card.split(' ').map((word) => {
              if (['Cups'].includes(word) === true) return 1;
            });
            let result = 0;
            if (cups.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return cupsCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const WeeklySwordsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const swordsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const swords = card.split(' ').map((word) => {
              if (['Swords'].includes(word) === true) return 1;
            });
            let result = 0;
            if (swords.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return swordsCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const WeeklyWandsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const wandsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const wands = card.split(' ').map((word) => {
              if (['Wands'].includes(word) === true) return 1;
            });
            let result = 0;
            if (wands.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return wandsCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const WeeklyPentaclesCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const pentaclesCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const pentacles = card.split(' ').map((word) => {
              if (['Pentacles'].includes(word) === true) return 1;
            });
            let result = 0;
            if (pentacles.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return pentaclesCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const DailyCupsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const cupsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const cups = card.split(' ').map((word) => {
              if (['Cups'].includes(word) === true) return 1;
            });
            let result = 0;
            if (cups.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return cupsCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const DailySwordsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const swordsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const swords = card.split(' ').map((word) => {
              if (['Swords'].includes(word) === true) return 1;
            });
            let result = 0;
            if (swords.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return swordsCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const DailyWandsCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const wandsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const wands = card.split(' ').map((word) => {
              if (['Wands'].includes(word) === true) return 1;
            });
            let result = 0;
            if (wands.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return wandsCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const DailyPentaclesCount = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const questionTopic = tarot?.questionInfo['question_topic'];
        if (questionTopic !== questionTopicForRender) return 0;
        const formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
        if (
          formattedDate !== dateForRender &&
          dateForRender !== t(`chart.statistics-total`)
        )
          return 0;
        const pentaclesCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const pentacles = card.split(' ').map((word) => {
              if (['Pentacles'].includes(word) === true) return 1;
            });
            let result = 0;
            if (pentacles.includes(1)) {
              result = 1;
            } else {
              result = 0;
            }
            return result;
          })
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
        return pentaclesCount;
      }
      return 0;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const KindOfCardArrHistory = (
  tarotHistory,
  questionTopicForRender,
  dateForRender
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return tarotHistory.map((tarot) => {
    const kindOfCardArr = tarot?.spreadInfo?.selectedTarotCardsArr.map(
      (card, index1) => {
        const kindOfCard = card.split(' ').map((word) => {
          if (!['Pentacles', 'Swords', 'Cups', 'Wands'].includes(word) === true)
            return 'major';
        });
        return kindOfCard;
      }
    );
    return kindOfCardArr;
  });
};
