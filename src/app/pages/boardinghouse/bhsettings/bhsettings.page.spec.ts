import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BhsettingsPage } from './bhsettings.page';

describe('BhsettingsPage', () => {
  let component: BhsettingsPage;
  let fixture: ComponentFixture<BhsettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhsettingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BhsettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
