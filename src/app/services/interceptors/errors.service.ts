import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ModalService } from "@services/shared/modal.service";
import { NotificationsService } from "@services/shared/notifications.service";

@Injectable({
	providedIn: "root",
})
export class ErrorsInterceptor implements HttpInterceptor {
	constructor(
		private router: Router,
		private _modalService: ModalService,
		private _notificationsService: NotificationsService
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((errorResponse) => {
				switch (errorResponse.status) {
					case 401:
						this._modalService.reset();
						this.router.navigate(["/auth/login/"]);
						this._notificationsService.error({
							title: "Error de privilegios",
							message: errorResponse.error.error,
						});
						break;

					case 403:
						this._modalService.reset();
						this._notificationsService.error({
							title: "Ha ocurrido un error interno",
							message: errorResponse.error.error,
						});
						break;

					case 422:
						if (errorResponse.error.error instanceof Object) {
							Object.values(errorResponse.error.error).map((message: any) => {
								message.map((text: string) => {
									this._notificationsService.error({
										title: "Ha ocurrido un error interno",
										message: text,
									});
								});
							});
						} else {
							this._notificationsService.error({
								title: "Ha ocurrido un error interno",
								message: errorResponse.error.error,
							});
						}
						break;

					case 500:
						this._modalService.reset();
						this._notificationsService.error({
							title: "Ha ocurrido un error interno",
							message: errorResponse.error.error,
						});
						break;
				}

				return throwError(errorResponse.error);
			})
		);
	}
}
