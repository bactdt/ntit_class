// 对每一组评价，在 A / B 里随机选一个
document.querySelectorAll('div.options').forEach(block => {
  const a = block.querySelector('input.a-radio[value="A"]'); // 优
  const b = block.querySelector('input.a-radio[value="B"]'); // 良
  if (!a || !b) return;

  const choice = Math.random() < 0.5 ? a : b; // 随机选 A 或 B
  choice.checked = true;
  choice.dispatchEvent(new Event('change', { bubbles: true }));
  choice.click();
});
