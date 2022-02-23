import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CcPage } from './cc.page';

describe('CcPage', () => {
  let component: CcPage;
  let fixture: ComponentFixture<CcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
