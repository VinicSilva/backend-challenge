import {
  CallHandler, 
  ExecutionContext, 
  Injectable,
  NestInterceptor, 
  Logger,
  ConflictException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import * as rTracer from 'cls-rtracer'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger()

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const traceId = rTracer.id() as string
    const {
      originalUrl,
      method,
      params,
      query,
      body,
      user,
      hostname,
      headers,
    }: any = context.switchToHttp().getRequest()
    const ip = headers['x-forwarded-for'] || ''
    const host = user?.host || hostname
    const url = host + originalUrl
    this.logger.log(`### Request API | ${JSON.stringify({ url, method, params, query, body, hostname, ip })} | TraceId: (${traceId})`)
    return next.handle().pipe(
      tap((data: any) => {
        const { statusCode } = context.switchToHttp().getResponse()
        this.logger.log(`### Response API | ${JSON.stringify({ method, url, statusCode, data, ip })} | TraceId: (${traceId})`)
      }, (exception: any) => {
          const exceptionMessage = exception.message;
          if (exceptionMessage.includes('violates unique constraint')) {
            let errorMessage = 'This place already is saved.';
            this.logger.log(`### Response API | ${JSON.stringify({ method, url, statusCode: 409, data: errorMessage, ip })} | TraceId: (${traceId})`)
            throw new ConflictException(errorMessage);
          }
        }
      ),
    )
  }
}
