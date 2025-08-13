/**
 * Utility functions for managing authentication tokens in localStorage
 */

import type { User } from "@/shared/types/user.type";

// Key constants for localStorage
export const AUTH_STORAGE_KEYS = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
    USER: "user",
    ROLE: "role",
} as const;

// Sidebar preference keys (không xóa khi logout)
export const PREFERENCE_STORAGE_KEYS = {
    SIDEBAR_COLLAPSED: "sidebar-is-collapsed",
    SIDEBAR_OPEN_MENUS: "sidebar-open-menus",
} as const;

/**
 * Set authentication tokens in localStorage
 */
export const setAuthTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

/**
 * Get access token from localStorage
 */
export const getAccessToken = (): string | null => {
    return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * Get refresh token from localStorage
 */
export const getRefreshToken = (): string | null => {
    return localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * Set user data in localStorage
 */
export const setUserData = (user: User) => {
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(AUTH_STORAGE_KEYS.ROLE, String(user.role));
};

/**
 * Get user data from localStorage
 */
export const getUserData = (): User | null => {
    const userData = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
};

/**
 * Get user role from localStorage
 */
export const getUserRole = (): number | null => {
    const role = localStorage.getItem(AUTH_STORAGE_KEYS.ROLE);
    return role ? parseInt(role, 10) : null;
};

/**
 * Clear all authentication data from localStorage
 * Preserves user preferences like sidebar state
 */
export const clearAuthData = () => {
    // Xóa các token và thông tin user
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    localStorage.removeItem(AUTH_STORAGE_KEYS.ROLE);

    console.log("🔐 Auth data cleared from localStorage:", {
        accessToken: "removed",
        refreshToken: "removed",
        user: "removed",
        role: "removed"
    });
};

/**
 * Clear all localStorage data (including preferences)
 */
export const clearAllStorageData = () => {
    localStorage.clear();
    console.log("🧹 All localStorage data cleared");
};

/**
 * Check if user is authenticated based on tokens
 */
export const isAuthenticated = (): boolean => {
    const accessToken = getAccessToken();
    const user = getUserData();
    return !!(accessToken && user);
};
