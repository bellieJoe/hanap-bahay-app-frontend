import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CpssPage } from './cpss.page';

describe('CpssPage', () => {
  let component: CpssPage;
  let fixture: ComponentFixture<CpssPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpssPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CpssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
