import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BhreservePage } from './bhreserve.page';

describe('BhreservePage', () => {
  let component: BhreservePage;
  let fixture: ComponentFixture<BhreservePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhreservePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BhreservePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
