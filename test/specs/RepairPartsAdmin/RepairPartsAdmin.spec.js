/* global browser, beforeEach, describe, it, expect */
describe('Repair Parts Admin Page', () => {
  beforeEach(() => {
    browser.url('/');
    browser.waitForText('[data-reactroot]');
  });

  it('should have an Add New part button & a searchfield', () => {
    expect(browser.isExisting('#addNewPart')).toBe(true);
    expect(browser.isExisting('#searchField')).toBe(true);
  });

  it('should render the parts details for valid partNumber', () => {
    browser.element('#searchField').setValue('123');
    browser.element('#searchLink').click();
    browser.pause(3000);
    expect(browser.isExisting('.card')).toBe(true);
  });

  it('should render the parts details on press of Key Enter', () => {
    browser.element('#searchField').setValue('123');
    browser.keys(['Enter']);
    browser.pause(3000);
    expect(browser.isExisting('.card')).toBe(true);
  });

  it('should not render the parts details for invalid partNumber on press of Key Enter', () => {
    browser.element('#searchField').setValue('xteyyeu');
    browser.keys(['Enter']);
    browser.pause(3000);
    expect(browser.isExisting('.card')).toBe(false);
  });

  it('should not render the parts details for invalid partNumber', () => {
    browser.element('#searchField').setValue('xteyyeu');
    browser.element('#searchLink').click();
    browser.pause(3000);
    expect(browser.isExisting('.card')).toBe(false);
  });

  it('should open edit part modal on edit part button click', () => {
    browser.element('#searchField').setValue('123');
    browser.element('#searchLink').click();
    browser.pause(3000);
    browser.element('#part-123010-1').click();
    browser.element('#cost').setValue('10');
    browser.element('#save').click();
    browser.pause(3000);
    expect(browser.isExisting('#modalSuccessID')).toBe(true);
  });

  it('should open add part modal on add part button click', () => {
    browser.element('#addNewPart').click();
    browser.pause(3000);
    expect(browser.isExisting('#modalAddPartID')).toBe(true);
    browser.element('#partNumberInput').setValue('1001');
    browser.element('#descriptionInput').setValue('desc-test');
    browser.element('#brand').setValue('1001 - Makita');
    browser.element('#supplier').setValue('14 - ITW INDUSTRIAL FASTENING');
    browser.element('#cost').setValue('10');
    browser.element('#savePart').click();
    browser.pause(3000);
    expect(browser.isExisting('#modalSuccessID')).toBe(true);
  });
});
