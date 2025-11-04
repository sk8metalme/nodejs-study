// Error Utilities
// エラーハンドリング関連のユーティリティ

import { ApiError } from '../types';
import { ERROR_CODES } from '../constants';

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }

  toJSON(): ApiError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = '認証が必要です') {
    super(ERROR_CODES.AUTH_REQUIRED, message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = '権限がありません') {
    super(ERROR_CODES.INSUFFICIENT_PERMISSIONS, message, 403);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(ERROR_CODES.INVALID_INPUT, message, 400, details);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'リソース') {
    super(ERROR_CODES.RESOURCE_NOT_FOUND, `${resource}が見つかりません`, 404);
  }
}
