import {Plugin} from 'obsidian';
import {PageBreakInserter} from "./page-break-inserter";


export default class PageBreakPlugin extends Plugin {

	private readonly pageBreakInserter = PageBreakInserter.create();

	async onload() {
		// Registers an item in the editor menu (the menu that appears when you
		// right-click in the editor) to insert a page break.
		this.registerEvent(this.app.workspace.on('editor-menu', (menu, editor) => {
			menu.addItem((item) => {
				item.setTitle('Insert page break')
					.setIcon('minus')
					.onClick(() => this.pageBreakInserter.insertPageBreak(editor))
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
				this.pageBreakInserter.insertPageBreak(editor);
			}
		});
	}
}
