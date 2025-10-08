import {PageBreakInserter} from "./PageBreakInserter";
import {Editor} from "obsidian";

describe('PageBreakInserter', () => {

	const inserter: PageBreakInserter = PageBreakInserter.create();

	// Mock the editor alongside the methods we need.
	const editor: jest.Mocked<Editor> = {
		getCursor: jest.fn(),
		replaceRange: jest.fn(),
		setCursor: jest.fn()
	} as unknown as jest.Mocked<Editor>;

	describe('When inserting a page break', () => {

		it('Should insert page break at cursor position', () => {
			const cursor = {line: 5, ch: 10};
			editor.getCursor.mockReturnValue(cursor);

			inserter.insertPageBreak(editor);

			expect(editor.replaceRange).toHaveBeenCalledWith(
				expect.stringContaining('<div class="page-break">'), cursor
			);
		});

		it('Should insert page break with empty line after', () => {
			const cursor = {line: 5, ch: 10};
			editor.getCursor.mockReturnValue(cursor);

			inserter.insertPageBreak(editor);

			expect(editor.replaceRange).toHaveBeenCalledWith(
				expect.stringContaining('\n'), cursor
			);
		});

		it('Should move cursor to end of page break', () => {
			const cursor = {line: 5, ch: 10};
			editor.getCursor.mockReturnValue(cursor);

			inserter.insertPageBreak(editor);

			expect(editor.setCursor).toHaveBeenCalledWith({line: 6, ch: 0});
		});
	});
});
