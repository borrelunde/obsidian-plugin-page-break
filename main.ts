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
	}
}
