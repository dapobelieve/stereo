import {CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, BadGatewayException} from "@nestjs/common"
import { map, Observable, catchError, throwError } from "rxjs";




@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
          map(_data => {
            const { data, message="Request successful", status="success"} = _data
            return {
              data,
              status,
              message
            }
          }),
          catchError(error => {
            if (error instanceof HttpException) {
              const status = error.getStatus();
              const message = error.getResponse();
              console.log(error)
              return throwError(() => new HttpException(message, status));
            } else {
              const status = 500;
              const message = 'Internal server error';
              return throwError({ status, message });
            }
          }),
        )
    }

}