describe('validatorName', () => {
  it('debería ser una funcion', () => {
    assert.equal(typeof window.validatorName, 'function');
  });
  it('debería retornar true para yulissateran', () => {
    assert.deepEqual(window.validatorName('yulissateran'), true);
  });
  it('debería retornar true para Janna Perez', () => {
    assert.deepEqual(window.validatorName('Janna Perez'), true);
  });
  
  it('debería retornar false para yuli', () => {
    assert.deepEqual(window.validatorName('yuli'), false);
  });
  it('debería retornar false para Roj%&', () => {
    assert.deepEqual(window.validatorName('Roj%&'), false);
  });
});


describe('validatorNameU', () => {
  it('debería ser una funcion', () => {
    assert.equal(typeof window.validatorIdentification, 'function');
  });
  it('debería retornar true para 12345678', () => {
    assert.deepEqual(window.validatorIdentification('12345678'), true);
  });
  it('debería retornar true para 87654321', () => {
    assert.deepEqual(window.validatorIdentification('87654321'), true);
  });
  
  it('debería retornar false para a2233445', () => {
    assert.deepEqual(window.validatorIdentification('a2233445'), false);
  });
  it('debería retornar false para R123', () => {
    assert.deepEqual(window.validatorIdentification('R123'), false);
  });
});

describe('newDate ', () => {
  it('debería ser una funcion', () => {
    assert.equal(typeof window.newDate, 'function');
  });
  it('debería retornar un string', () => {
    assert.deepEqual(typeof window.newDate(), 'string');
  });
});
/* *******************************************FUNCIONES DE VALIDACIÓN*******************************/

