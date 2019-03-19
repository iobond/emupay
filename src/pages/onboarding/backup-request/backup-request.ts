import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

// Providers
import { Logger } from '../../../providers/logger/logger';
import { PersistenceProvider } from '../../../providers/persistence/persistence';
import { PopupProvider } from '../../../providers/popup/popup';

// Pages
import { BackupWarningPage } from '../../backup/backup-warning/backup-warning';
import { DisclaimerPage } from '../disclaimer/disclaimer';
import { TabsPage } from '../../tabs/tabs';

@Component({
  selector: 'page-backup-request',
  templateUrl: 'backup-request.html'
})
export class BackupRequestPage {
  private walletId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private logger: Logger,
    private translate: TranslateService,
    private persistenceProvider: PersistenceProvider,
    private popupProvider: PopupProvider
  ) {
    this.walletId = this.navParams.get('walletId');
  }

  ionViewDidLoad() {
    this.logger.info('Loaded: BackupRequestPage');
    confirm();
  }

  public initBackupFlow(): void {
    this.navCtrl.push(BackupWarningPage, {
      walletId: this.walletId,
      fromOnboarding: true
    });
  }

  public doBackupLater(): void {
    let title = this.translate.instant('Watch Out!');
    let message = this.translate.instant(
      'If this device is replaced or this app is deleted, neither you nor Emupay can recover your funds without a backup.'
    );
    let okText = this.translate.instant('I understand');
    let cancelText = this.translate.instant('Go Back');
    this.popupProvider
      .ionicConfirm(title, message, okText, cancelText)
      .then(res => {
        if (!res) return;
        let title = this.translate.instant('Are you sure you want to skip it?');
        let message = this.translate.instant(
          'You can back up your wallet later from your wallet settings.'
        );
        let okText = this.translate.instant('Yes, skip');
        let cancelText = this.translate.instant('Go Back');
        this.popupProvider
          .ionicConfirm(title, message, okText, cancelText)
          .then(res => {
            if (!res) return;
            this.navCtrl.push(DisclaimerPage);
          });
      });
  }

  confirm() {
    this.persistenceProvider.setEmailLawCompliance('accepted');
    this.persistenceProvider.setDisclaimerAccepted();
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot({ animate: false });
  }
}
