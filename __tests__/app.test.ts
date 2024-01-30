describe('getRandomNumber', () => {
  it('should return a random number between 1 and 10', () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1
    expect(randomNumber).toBeGreaterThanOrEqual(1)
    expect(randomNumber).toBeLessThanOrEqual(10)
  })
})
