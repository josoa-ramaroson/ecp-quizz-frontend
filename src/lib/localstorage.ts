
import { EErrorMessage, ELocalStorageKey } from "@/enums";

export class LocalStorageService {
    static setItem<T>(key: ELocalStorageKey, value: T) {
        try {
            localStorage
                .setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(e);
            throw new Error(EErrorMessage.SET_ITEM_LOCAL_STORAGE_ERROR);
        }
    }

    static getItem<T>(key: ELocalStorageKey): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(error);
            throw new Error(EErrorMessage.GET_ITEM_LOCAL_STORAGE_ERROR);
        }
    }

    static removeItem(key: ELocalStorageKey) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
            throw new Error(EErrorMessage.REMOVE_ITEM_LOCAL_STORAGE_ERROR);
        }
    }

    static clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error(error);
            throw new Error(EErrorMessage.CLEAR_LOCAL_STORAGE_ERROR);
        }
    }
}