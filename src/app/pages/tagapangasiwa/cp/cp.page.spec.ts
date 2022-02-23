import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CpPage } from './cp.page';

describe('CpPage', () => {
  let component: CpPage;
  let fixture: ComponentFixture<CpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
