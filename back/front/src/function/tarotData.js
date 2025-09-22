import { isWithinThisMonth, isWithinThisWeek, isWithinThisDay } from './isTimeAgo.js';
export const TotalMajorCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
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
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};
export const TotalMinorCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
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
export const MonthlyMajorCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
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
export const MonthlyMinorCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
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
export const WeeklyMajorCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
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
export const WeeklyMinorCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
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
export const DailyMajorCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
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
export const DailyMinorCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
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
export const TotalCupsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      const cupsCount = tarot?.spreadInfo?.selectedTarotCardsArr
        ?.map((card) => {
          const cups = card.split(' ').map((word) => {
            if (
              ['Cups'].includes(word) === true
            )
              return 1;
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
export const TotalSwordsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      const swordsCount = tarot?.spreadInfo?.selectedTarotCardsArr
        ?.map((card) => {
          const swords = card.split(' ').map((word) => {
            if (
              ['Swords'].includes(word) === true
            )
              return 1;
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
export const TotalWandsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      const wandsCount = tarot?.spreadInfo?.selectedTarotCardsArr
        ?.map((card) => {
          const wands = card.split(' ').map((word) => {
            if (
              ['Wands'].includes(word) === true
            )
              return 1;
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
export const TotalPentaclesCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      const pentaclesCount = tarot?.spreadInfo?.selectedTarotCardsArr
        ?.map((card) => {
          const pentacles = card.split(' ').map((word) => {
            if (
              ['Pentacles'].includes(word) === true
            )
              return 1;
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
export const MonthlyCupsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const cupsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const cups = card.split(' ').map((word) => {
              if (
                ['Cups'].includes(word) === true
              )
                return 1;
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
export const MonthlySwordsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const swordsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const swords = card.split(' ').map((word) => {
              if (
                ['Swords'].includes(word) === true
              )
                return 1;
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
export const MonthlyWandsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const wandsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const wands = card.split(' ').map((word) => {
              if (
                ['Wands'].includes(word) === true
              )
                return 1;
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
export const MonthlyPentaclesCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisMonth(tarot)) {
        const pentaclesCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const pentacles = card.split(' ').map((word) => {
              if (
                ['Pentacles'].includes(word) === true
              )
                return 1;
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
export const WeeklyCupsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const cupsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const cups = card.split(' ').map((word) => {
              if (
                ['Cups'].includes(word) === true
              )
                return 1;
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
export const WeeklySwordsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const swordsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const swords = card.split(' ').map((word) => {
              if (
                ['Swords'].includes(word) === true
              )
                return 1;
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
export const WeeklyWandsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const wandsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const wands = card.split(' ').map((word) => {
              if (
                ['Wands'].includes(word) === true
              )
                return 1;
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
export const WeeklyPentaclesCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisWeek(tarot)) {
        const pentaclesCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const pentacles = card.split(' ').map((word) => {
              if (
                ['Pentacles'].includes(word) === true
              )
                return 1;
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
export const DailyCupsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const cupsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const cups = card.split(' ').map((word) => {
              if (
                ['Cups'].includes(word) === true
              )
                return 1;
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
export const DailySwordsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const swordsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const swords = card.split(' ').map((word) => {
              if (
                ['Swords'].includes(word) === true
              )
                return 1;
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
export const DailyWandsCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const wandsCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const wands = card.split(' ').map((word) => {
              if (
                ['Wands'].includes(word) === true
              )
                return 1;
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
export const DailyPentaclesCount = tarotHistory => {
  return tarotHistory
    ?.map((tarot) => {
      if (isWithinThisDay(tarot)) {
        const pentaclesCount = tarot?.spreadInfo?.selectedTarotCardsArr
          ?.map((card) => {
            const pentacles = card.split(' ').map((word) => {
              if (
                ['Pentacles'].includes(word) === true
              )
                return 1;
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
export const KindOfCardArrHistory = tarotHistory => {
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
