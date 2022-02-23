import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TenantannouncementPage } from './tenantannouncement.page';

describe('TenantannouncementPage', () => {
  let component: TenantannouncementPage;
  let fixture: ComponentFixture<TenantannouncementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantannouncementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TenantannouncementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
