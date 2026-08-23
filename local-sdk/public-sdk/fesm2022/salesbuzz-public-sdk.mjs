import { BIInterfacesModule } from 'bi-interfaces';
export * from 'bi-interfaces';
import { BIModulesModule } from 'bi-modules';
export * from 'bi-modules';
import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';

class PublicApiClient {
}

class PublicApiClientModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.24", ngImport: i0, type: PublicApiClientModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.24", ngImport: i0, type: PublicApiClientModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.24", ngImport: i0, type: PublicApiClientModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.24", ngImport: i0, type: PublicApiClientModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });

class PublicSdkModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.24", ngImport: i0, type: PublicSdkModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.24", ngImport: i0, type: PublicSdkModule, imports: [BIInterfacesModule, BIModulesModule, PublicApiClientModule], exports: [BIInterfacesModule, BIModulesModule, PublicApiClientModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.24", ngImport: i0, type: PublicSdkModule, imports: [BIInterfacesModule, BIModulesModule, PublicApiClientModule, BIInterfacesModule, BIModulesModule, PublicApiClientModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.24", ngImport: i0, type: PublicSdkModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BIInterfacesModule, BIModulesModule, PublicApiClientModule],
                    exports: [BIInterfacesModule, BIModulesModule, PublicApiClientModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { PublicApiClient, PublicApiClientModule, PublicSdkModule };
//# sourceMappingURL=salesbuzz-public-sdk.mjs.map
