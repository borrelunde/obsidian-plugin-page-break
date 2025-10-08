import {Editor} from "obsidian";

/**
 * A class to insert page breaks.
 */
export class PageBreakInserter {

	private static readonly PAGE_BREAK =
		'<div class="page-break">' +
		'<span class="page-break-label">' +
		'Page break. An empty line after the break is required.' +
		'</span>' +
		'</div>' +
		'\n';  // Empty line after the page break.

	/**
	 * Private constructor to enforce the use of the factory method.
	 */
	private constructor() {
	}

	/**
	 * Factory method to create a new instance of PageBreakInserter.
	 */
	static create(): PageBreakInserter {
		return new PageBreakInserter();
	}

	/**
	 * Inserts a page break at the current cursor position, then moves the
	 * cursor position to the end of the break.
	 *
	 * @param editor the editor to insert the page break in.
	 */
	insertPageBreak(editor: Editor): void {
		const cursor = editor.getCursor();
		editor.replaceRange(PageBreakInserter.PAGE_BREAK, cursor);

		// Move the cursor position to the end of the page break.
		const endOfPageBreak = {
			line: cursor.line + 1,
			ch: 0
		};
		editor.setCursor(endOfPageBreak);
	}
}
