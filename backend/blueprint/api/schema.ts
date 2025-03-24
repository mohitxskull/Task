/// <reference path="../reference.ts" />

import { InferController, endpoint } from '@folie/blueprint-lib'

/*
 * This is an auto-generated file. Changes made to this file will be lost.
 * Run `nr ace blueprint:generate` to update it.
 */

export type V1AuthSessionRoute = InferController<
  (typeof import('../../app/controllers/auth/session_controller.ts'))['default']
>
export type V1AuthSignOutRoute = InferController<
  (typeof import('../../app/controllers/auth/sign_out_controller.ts'))['default']
>
export type V1AuthSignInRoute = InferController<
  (typeof import('../../app/controllers/auth/sign_in_controller.ts'))['default']
>
export type V1AuthSignUpRoute = InferController<
  (typeof import('../../app/controllers/auth/sign_up_controller.ts'))['default']
>
export type V1AuthVerifyRoute = InferController<
  (typeof import('../../app/controllers/auth/verify_controller.ts'))['default']
>
export type V1AuthPasswordUpdateRoute = InferController<
  (typeof import('../../app/controllers/auth/password/update_controller.ts'))['default']
>
export type V1AuthProfileUpdateRoute = InferController<
  (typeof import('../../app/controllers/auth/profile/update_controller.ts'))['default']
>
export type V1TaskListRoute = InferController<
  (typeof import('../../app/controllers/task/list_controller.ts'))['default']
>
export type V1TaskShowRoute = InferController<
  (typeof import('../../app/controllers/task/show_controller.ts'))['default']
>
export type V1TaskCreateRoute = InferController<
  (typeof import('../../app/controllers/task/create_controller.ts'))['default']
>
export type V1TaskUpdateRoute = InferController<
  (typeof import('../../app/controllers/task/update_controller.ts'))['default']
>
export type V1TaskDeleteRoute = InferController<
  (typeof import('../../app/controllers/task/delete_controller.ts'))['default']
>
export type V1PingRoute = InferController<
  (typeof import('../../app/controllers/ping_controller.ts'))['default']
>

export const endpoints = {
  V1_AUTH_SESSION: endpoint<V1AuthSessionRoute>({
    form: false,
    url: '/api/v1/auth/session',
    method: 'GET',
  }),
  V1_AUTH_SIGN_OUT: endpoint<V1AuthSignOutRoute>({
    form: false,
    url: '/api/v1/auth/sign-out',
    method: 'POST',
  }),
  V1_AUTH_SIGN_IN: endpoint<V1AuthSignInRoute>({
    form: false,
    url: '/api/v1/auth/sign-in',
    method: 'POST',
  }),
  V1_AUTH_SIGN_UP: endpoint<V1AuthSignUpRoute>({
    form: false,
    url: '/api/v1/auth/sign-up',
    method: 'POST',
  }),
  V1_AUTH_VERIFY: endpoint<V1AuthVerifyRoute>({
    form: false,
    url: '/api/v1/auth/verify',
    method: 'POST',
  }),
  V1_AUTH_PASSWORD_UPDATE: endpoint<V1AuthPasswordUpdateRoute>({
    form: false,
    url: '/api/v1/auth/password',
    method: 'PUT',
  }),
  V1_AUTH_PROFILE_UPDATE: endpoint<V1AuthProfileUpdateRoute>({
    form: false,
    url: '/api/v1/auth/profile',
    method: 'PUT',
  }),
  V1_TASK_LIST: endpoint<V1TaskListRoute>({ form: false, url: '/api/v1/task', method: 'GET' }),
  V1_TASK_SHOW: endpoint<V1TaskShowRoute>({
    form: false,
    url: '/api/v1/task/{{ taskId }}',
    method: 'GET',
  }),
  V1_TASK_CREATE: endpoint<V1TaskCreateRoute>({ form: false, url: '/api/v1/task', method: 'POST' }),
  V1_TASK_UPDATE: endpoint<V1TaskUpdateRoute>({
    form: false,
    url: '/api/v1/task/{{ taskId }}',
    method: 'PUT',
  }),
  V1_TASK_DELETE: endpoint<V1TaskDeleteRoute>({
    form: false,
    url: '/api/v1/task/{{ taskId }}',
    method: 'DELETE',
  }),
  V1_PING: endpoint<V1PingRoute>({ form: false, url: '/api/v1/ping', method: 'GET' }),
} as const
