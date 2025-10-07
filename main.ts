import {Editor, Plugin} from 'obsidian';


export default class PageBreakPlugin extends Plugin {

	async onload() {
		// Registers an item in the editor menu (the menu that appears when you
		// right-click in the editor) to insert a page break.
		this.registerEvent(this.app.workspace.on('editor-menu', (menu, editor) => {
			menu.addItem((item) => {
				item.setTitle('Insert page break')
					.setIcon('minus')
					.onClick(() => this.insertPageBreakAtCursor(editor))
					.setSection('page-break');
			});
		}));

		// Registers a command to insert a page break.
		this.addCommand({
			id: 'insert-page-break',
			name: 'Insert page break',
			// The hotkey is Ctrl+Shift+Enter on Windows and Linux, and Cmd+Shift+Enter on Mac.
			hotkeys: [{
				modifiers: ['Mod', 'Shift'],
				key: 'Enter'
			}],
			editorCallback: (editor) => {
				this.insertPageBreakAtCursor(editor);
			}
		});
	}

	private insertPageBreakAtCursor(editor: Editor) {
		const cursor = editor.getCursor();
		const pageBreak =
			'<div class="page-break"><span class="page-break-label">Page break. An empty line after the break is required.</span></div>\n';
		editor.replaceRange(pageBreak, cursor);

		// Move the cursor position to the end of the page break.
		const endOfPageBreak = {
			line: cursor.line + 1,
			ch: 0
		};
		editor.setCursor(endOfPageBreak);
	}
}
