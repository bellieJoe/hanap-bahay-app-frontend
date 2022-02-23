import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BiPage } from './bi.page';

describe('BiPage', () => {
  let component: BiPage;
  let fixture: ComponentFixture<BiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
