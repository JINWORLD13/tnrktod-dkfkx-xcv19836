import { useTranslation } from 'react-i18next';
import {
  isWithinThisMonth,
  isWithinThisWeek,
  isWithinThisDay,
} from './isTimeAgo.js';
export const TotalMajorCount = (tarotHistory, themeForRender) => {
  const { t } = useTranslation();
  return tarotHistory
    ?.map((tarot) => {
      const theme = tarot?.questionInfo?.theme;
      if (theme !== themeForRender) return 0;
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
export const TotalMinorCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      const theme = tarot?.questionInfo?.theme;
      if (theme !== themeForRender) return 0;
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
export const MonthlyMajorCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const MonthlyMinorCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const WeeklyMajorCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const WeeklyMinorCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const DailyMajorCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const DailyMinorCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const TotalCupsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      const theme = tarot?.questionInfo?.theme;
      if (theme !== themeForRender) return 0;
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
export const TotalSwordsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      const theme = tarot?.questionInfo?.theme;
      if (theme !== themeForRender) return 0;
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
export const TotalWandsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      const theme = tarot?.questionInfo?.theme;
      if (theme !== themeForRender) return 0;
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
export const TotalPentaclesCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      const theme = tarot?.questionInfo?.theme;
      if (theme !== themeForRender) return 0;
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
export const MonthlyCupsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const MonthlySwordsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const MonthlyWandsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const MonthlyPentaclesCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const WeeklyCupsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const WeeklySwordsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const WeeklyWandsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const WeeklyPentaclesCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const DailyCupsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const DailySwordsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const DailyWandsCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const DailyPentaclesCount = (tarotHistory, themeForRender) => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const theme = tarot?.questionInfo?.theme;
        if (theme !== themeForRender) return 0;
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
export const KindOfCardArrHistory = (tarotHistory, themeForRender) => {
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
