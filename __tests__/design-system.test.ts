import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Design System (Story 1-3)', () => {
  const globalsCss = fs.readFileSync(
    path.resolve(__dirname, '../app/globals.css'),
    'utf-8'
  );

  describe('Score color CSS variables', () => {
    const scoreVars = [
      '--score-excellent',
      '--score-good',
      '--score-fair',
      '--score-poor',
    ];

    it('defines all score colors in light theme', () => {
      // Extract :root block
      const rootMatch = globalsCss.match(/:root\s*\{([^}]+)\}/s);
      expect(rootMatch).not.toBeNull();
      const rootBlock = rootMatch![1];

      scoreVars.forEach((v) => {
        expect(rootBlock).toContain(v);
      });
    });

    it('defines all score colors in dark theme', () => {
      // Extract .dark block
      const darkMatch = globalsCss.match(/\.dark\s*\{([^}]+)\}/s);
      expect(darkMatch).not.toBeNull();
      const darkBlock = darkMatch![1];

      scoreVars.forEach((v) => {
        expect(darkBlock).toContain(v);
      });
    });
  });

  describe('Tailwind config', () => {
    it('extends theme with score colors', () => {
      const tailwindConfig = fs.readFileSync(
        path.resolve(__dirname, '../tailwind.config.ts'),
        'utf-8'
      );

      expect(tailwindConfig).toContain('score');
      expect(tailwindConfig).toContain('score-excellent');
      expect(tailwindConfig).toContain('score-good');
      expect(tailwindConfig).toContain('score-fair');
      expect(tailwindConfig).toContain('score-poor');
    });
  });

  describe('shadcn/ui configuration', () => {
    it('components.json exists with correct settings', () => {
      const componentsJson = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, '../components.json'),
          'utf-8'
        )
      );

      expect(componentsJson.tsx).toBe(true);
      expect(componentsJson.rsc).toBe(true);
      expect(componentsJson.aliases.ui).toBe('@/components/ui');
      expect(componentsJson.tailwind.baseColor).toBe('slate');
    });

    it('required UI components are installed', () => {
      const uiDir = path.resolve(__dirname, '../components/ui');
      const requiredComponents = [
        'button.tsx',
        'card.tsx',
        'skeleton.tsx',
        'tooltip.tsx',
        'dialog.tsx',
        'sheet.tsx',
        'popover.tsx',
      ];

      requiredComponents.forEach((component) => {
        expect(
          fs.existsSync(path.join(uiDir, component)),
          `Missing UI component: ${component}`
        ).toBe(true);
      });
    });
  });
});
