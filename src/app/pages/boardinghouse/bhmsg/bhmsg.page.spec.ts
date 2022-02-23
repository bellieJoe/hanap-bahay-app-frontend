import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BhmsgPage } from './bhmsg.page';

describe('BhmsgPage', () => {
  let component: BhmsgPage;
  let fixture: ComponentFixture<BhmsgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhmsgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BhmsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
