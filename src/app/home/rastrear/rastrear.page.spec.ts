import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RastrearPage } from './rastrear.page';

describe('RastrearPage', () => {
  let component: RastrearPage;
  let fixture: ComponentFixture<RastrearPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RastrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
