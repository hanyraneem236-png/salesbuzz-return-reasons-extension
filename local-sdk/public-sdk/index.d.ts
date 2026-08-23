import * as i1 from 'bi-interfaces';
export * from 'bi-interfaces';
import * as i2 from 'bi-modules';
export * from 'bi-modules';
import { Observable } from 'rxjs';
import * as i0 from '@angular/core';

interface PublicApiRequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean | null | undefined>;
    withAuth?: boolean;
}

declare abstract class PublicApiClient {
    abstract get<T>(url: string, options?: PublicApiRequestOptions): Observable<T>;
    abstract post<T>(url: string, body: unknown, options?: PublicApiRequestOptions): Observable<T>;
    abstract put<T>(url: string, body: unknown, options?: PublicApiRequestOptions): Observable<T>;
    abstract patch<T>(url: string, body: unknown, options?: PublicApiRequestOptions): Observable<T>;
    abstract delete<T>(url: string, options?: PublicApiRequestOptions): Observable<T>;
}

declare class PublicApiClientModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<PublicApiClientModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PublicApiClientModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PublicApiClientModule>;
}

declare class PublicSdkModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<PublicSdkModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PublicSdkModule, never, [typeof i1.BIInterfacesModule, typeof i2.BIModulesModule, typeof PublicApiClientModule], [typeof i1.BIInterfacesModule, typeof i2.BIModulesModule, typeof PublicApiClientModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PublicSdkModule>;
}

export { PublicApiClient, PublicApiClientModule, PublicSdkModule };
export type { PublicApiRequestOptions };
