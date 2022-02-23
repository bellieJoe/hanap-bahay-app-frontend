import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RvwPage } from './rvw.page';

describe('RvwPage', () => {
  let component: RvwPage;
  let fixture: ComponentFixture<RvwPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RvwPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RvwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
