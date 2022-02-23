import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BhmenuPage } from './bhmenu.page';

describe('BhmenuPage', () => {
  let component: BhmenuPage;
  let fixture: ComponentFixture<BhmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhmenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BhmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
