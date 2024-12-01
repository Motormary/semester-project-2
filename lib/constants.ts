import "server-only"

export const API_BASE = process.env.API_BASE

export const API_AUTH = `${API_BASE}/auth`

export const API_AUTH_LOGIN = `${API_AUTH}/login`

export const API_AUTH_REGISTER = `${API_AUTH}/register`

export const API_AUCTION = `${API_BASE}/auction`

export const API_AH_LISTINGS = `${API_AUCTION}/listings`

export const API_AH_USERS = `${API_AUCTION}/profiles`
