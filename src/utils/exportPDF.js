import jsPDF from "jspdf";

export function downloadPDF({
  answers,

  result,

  story,
}) {
  const pdf = new jsPDF();

  let y = 20;

  function line(text) {
    pdf.text(String(text), 15, y);

    y += 10;
  }

  pdf.setFontSize(18);

  line("Financial Diagnosis Report");

  y += 10;

  pdf.setFontSize(12);

  line(`Score: ${result.score}/100`);

  line(`Level: ${result.level}`);

  line(`Global Score: ${result.globalScore}/100`);

  y += 10;

  line("Recommended Investments:");

  result.investments.forEach((i) => line(`• ${i}`));

  y += 10;

  line("Advice:");

  (result.advice || []).forEach((a) => line(`• ${a}`));

  y += 10;

  line("Story:");

  const split = pdf.splitTextToSize(story, 170);

  pdf.text(split, 15, y);

  pdf.save("financial-report.pdf");
}
