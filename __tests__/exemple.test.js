function soma(a, b) {
  return a + b;
}

test('Soma = 5', () => {
  const res = soma(2, 3);

  expect(res).toBe(5);
});
