import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TpmenuPage } from './tpmenu.page';

describe('TpmenuPage', () => {
  let component: TpmenuPage;
  let fixture: ComponentFixture<TpmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpmenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TpmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
