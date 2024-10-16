
export const isTomorrow = (datetime: string): boolean => {
    const givenDate = new Date(datetime);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
  
    return givenDate.getDate() == tomorrow.getDate();
  };
  
export const isToday = (datetime: string): boolean => {
    const givenDate = new Date(datetime);
    const today = new Date();

    return givenDate.getDate() == today.getDate();
};

export const nextTimeInterval = (time: string): string => {
  const timeMap: { [key: string]: string } = {
    "00": "06:00",
    "06": "12:00",
    "12": "18:00",
    "18": "00:00"
  };
  return timeMap[time];
};