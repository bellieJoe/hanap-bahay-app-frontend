import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetdirPage } from './getdir.page';

describe('GetdirPage', () => {
  let component: GetdirPage;
  let fixture: ComponentFixture<GetdirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetdirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetdirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
