import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuPage } from './cu.page';

describe('CuPage', () => {
  let component: CuPage;
  let fixture: ComponentFixture<CuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
