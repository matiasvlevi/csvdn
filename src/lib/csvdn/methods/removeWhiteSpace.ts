export function removeWhiteSpace(label: string) {
  return label.replace(/.*?( )?/gm, '');
}