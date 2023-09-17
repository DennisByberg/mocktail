// localStorage.ts

// Save data to local storage
export function saveToLocalStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Load data from local storage
export function loadFromLocalStorage<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Clear data from local storage
export function clearLocalStorage(key: string) {
  localStorage.removeItem(key);
}
