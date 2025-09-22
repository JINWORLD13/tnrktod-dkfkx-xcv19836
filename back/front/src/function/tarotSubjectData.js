import { useTranslation } from 'react-i18next';
import {
  isMonthAgo,
  isWeekAgo,
  isDayAgo,
  isWithinThisMonth,
  isWithinThisWeek,
  isWithinThisDay,
} from './isTimeAgo.js';
export const TotalMajorCount = (
  tarotHistory,
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      const subject = tarot?.questionInfo?.subject;
      if (subject !== subjectForRender) return 0;
      const question = tarot?.questionInfo?.question;
      if (
        question !== questionForRender &&
        questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      const subject = tarot?.questionInfo?.subject;
      if (subject !== subjectForRender) return 0;
      const question = tarot?.questionInfo?.question;
      if (
        question !== questionForRender &&
        questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      const subject = tarot?.questionInfo?.subject;
      if (subject !== subjectForRender) return 0;
      const question = tarot?.questionInfo?.question;
      if (
        question !== questionForRender &&
        questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      const subject = tarot?.questionInfo?.subject;
      if (subject !== subjectForRender) return 0;
      const question = tarot?.questionInfo?.question;
      if (
        question !== questionForRender &&
        questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      const subject = tarot?.questionInfo?.subject;
      if (subject !== subjectForRender) return 0;
      const question = tarot?.questionInfo?.question;
      if (
        question !== questionForRender &&
        questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      const subject = tarot?.questionInfo?.subject;
      if (subject !== subjectForRender) return 0;
      const question = tarot?.questionInfo?.question;
      if (
        question !== questionForRender &&
        questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const subject = tarot?.questionInfo?.subject;
        if (subject !== subjectForRender) return 0;
        const question = tarot?.questionInfo?.question;
        if (
          question !== questionForRender &&
          questionForRender !== t(`chart.statistics-total`)
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
  subjectForRender,
  questionForRender
) => {
  return tarotHistory.map((tarot) => {
    const kindOfCardArr = tarot?.spreadInfo?.selectedTarotCardsArr.map(
      (card) => {
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
