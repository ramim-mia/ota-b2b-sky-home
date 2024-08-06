export interface TUser {
  success: boolean;
  message: string;
  data: User;
}
export interface User {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  photo: string;
  created_at: Date;
  agency_id: number;
  agency_name: string;
  agency_logo: string;
}
export interface TicketClass {
  type: 'P' | 'F' | 'J' | 'C' | 'S' | 'Y';
}

const lib = {
  async getLocalStorageWithRetry(key: string, maxRetries = 3, delay = 100) {
    let attempts = 0;

    const retry = async (): Promise<string | null> => {
      attempts++;
      const localStoreItem = localStorage.getItem(key) as string;

      if (localStoreItem || attempts >= maxRetries) {
        return localStoreItem;
      } else {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return retry();
      }
    };

    return retry();
  },

  getFromLocalStorage(key: string) {
    const flight = localStorage.getItem(key);
    return flight;
  },
  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  },

  removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
  },

  class: (c: 'P' | 'F' | 'J' | 'C' | 'S' | 'Y' | string) =>
    ({
      P: 'Premium First',
      C: 'Business',
      F: 'First',
      J: 'Premium Business',
      S: 'Premium Economy',
      Y: 'Economy',
    }[c] || 'N/A'),
};

export default lib;
