// https://github.com/summernote/summernote/issues/4136
jQuery(function () {
	function htmlEntities(str) {
		return String(str)
			// .replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			// .replace(/"/g, '&quot;');
	}
	function bbCodeCallback(context, $dropdown) {
		$dropdown.find('a').each(function (index, item) {
			$(item).on('click', function (event) {
				event.preventDefault();
				const bbCode = JSON.parse(
					$(item).attr('data-value').replace(/'/g, '"')
				);
				insertBbCode(context, bbCode.pre, bbCode.post);
			});
		});
	}
	function insertBbCode(context, pre, post) {
		const selected = htmlEntities(
			$.summernote.range.create() || ''
		);
		context.invoke(
			'editor.pasteHTML',
			pre + selected + post
		);
	}
	function insertTextInCodeView(context, text) {
		const [target] = context.layoutInfo.codable;
		const isActivated = context.invoke('codeview.isActivated');
		if (isActivated && 'selectionStart' in target) {
			const startPos = target.selectionStart;
			target.value = target.value.substring(0, startPos)
				+ text
				+ target.value.substring(startPos, target.value.length);
			target.selectionStart = target.selectionEnd = startPos;
			target.focus();
		}
	}
	const summernoteToolbars = {
		minimal: [
			['edit', ['undo', 'redo']],
			['style', ['bold', 'italic', 'underline', /**'superscript', 'subscript',**/ 'strikethrough', 'clear']],
			['headline', ['style']],
			['para', ['ul', 'ol', 'paragraph']],
			['bbCode', ['bbCode']],
			['insert', ['link', 'picture','elfinder','file']],
			['view', ['fullscreen', 'codeview', 'help']],
			['advanced', ['nextpage', 'more']],
			['save', ['publish']],
		],
		default: [
			['edit', ['undo', 'redo']],
			['style', ['bold', 'italic', 'underline', /**'superscript', 'subscript',**/ 'strikethrough', 'clear']],
			['headline', ['style']],
			['fontname', ['fontname']],
			['fontsize', ['fontsize']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['bbCode', ['bbCode']],
			['insert', ['link', 'picture','elfinder', 'file']],
			['view', ['fullscreen', 'codeview', 'help']],
			['advanced', ['nextpage', 'more']],
			['save', ['publish']],
		],
		maximum: [
			['edit', ['undo', 'redo']],
			['style', ['bold', 'italic', 'underline', /**'superscript', 'subscript',**/ 'strikethrough', 'clear']],
			['headline', ['style']],
			['fontname', ['fontname']],
			['fontsize', ['fontsize']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['bbCode', ['bbCode']],
			['insert', ['link', 'picture','elfinder','file', 'video', 'table', 'hr']],
			['preformatted', ['preformatted']],
			['view', ['fullscreen', 'codeview', 'help']],
			['advanced', ['nextpage', 'more']],
			['save', ['publish']],
		],
	}

	$('textarea.bb_code').summernote({
		lang: 'ru-RU',
		toolbar: summernoteToolbars[wysiwyg_toolbar || 'default'],
		styleTags: [
			/**'h1',**/ 'h2', 'h3', 'h4', 'h5', 'p'
		],
		buttons: {
			publish: function (context) {
				const ui = $.summernote.ui;
				const tooltip = NGCMS.lang['btn_save'];
				const button = ui.button({
					contents: `<i class="far fa-save" />`,
					tooltip: 'Сохранить',
					click: function (event) {
						$(this).closest('form').trigger('submit');
					},
				});
				return button.render();
			},
			preformatted: function (context) {
				const ui = $.summernote.ui;
				const buttonGroup = ui.buttonGroup([
					ui.button({
						className: 'dropdown-toggle show',
						contents: '<i class="fa fa-code" /> <span class="note-icon-caret"></span>',
						tooltip: 'Вставка кода с подсветкой синтаксиса',
						data: {
							toggle: 'dropdown',
						},
					}),
					ui.dropdown([
						ui.buttonGroup({
							className: 'note-align',
							children: [
								ui.button({
									contents: `<i class="fa fa-code" aria-label="Вставить код без подсветки" />`,
									tooltip: 'Код без подсветки ',
									click: function (event) { insertBbCode(context, '<strong class="strong">', '</strong>') },
								}),
								ui.button({
									contents:` <i class="fab fa-html5" title="Вставить код HTML" />`,
									tooltip: 'Вставить код HTML',
									click: function (event) { insertBbCode(context, '<div class="bbCodeName" style="padding-left:5px;font-weight:bold;font-size:7pt">Код: html</div><div class="code_sample"><pre style="border:1px inset;max-height:200px;overflow:auto;" class="html">', '</pre></div>') },
								}),
								ui.button({
									contents: `<i class="fab fa-css3" title="Вставить код CSS" />`,
									tooltip: 'Вставить код CSS',
									click: function (event) { insertBbCode(context, '<div class="bbCodeName" style="padding-left:5px;font-weight:bold;font-size:7pt">Код: css</div><div class="code_sample"><pre style="border:1px inset;max-height:200px;overflow:auto;" class="css">', '</pre></div>') },
								}),
								ui.button({
									contents: `<i class="fab fa-js-square" title="Вставить код JS" />`,
									tooltip: 'Вставить код JS',
									click: function (event) { insertBbCode(context, '<div class="bbCodeName" style="padding-left:5px;font-weight:bold;font-size:7pt">Код: js</div><div class="code_sample"><pre style="border:1px inset;max-height:200px;overflow:auto;" class="js">', '</pre></div>') },
								}),
								ui.button({
									contents: `<i class="fab fa-php" title="Вставить код PHP" />`,
									tooltip: 'Вставить код PHP',
									click: function (event) { insertBbCode(context, '<div class="bbCodeName" style="padding-left:5px;font-weight:bold;font-size:7pt">Код: php</div><div class="code_sample"><pre style="border:1px inset;max-height:200px;overflow:auto;" class="php">', '</pre></div>') },
								}),
								ui.button({
									contents: `<i class="fas fa-database" title="Вставить код SQL" />`,
									tooltip: 'Вставить код SQL',
									click: function (event) { insertBbCode(context, '<div class="bbCodeName" style="padding-left:5px;font-weight:bold;font-size:7pt">Код: sql</div><div class="code_sample"><pre style="border:1px inset;max-height:200px;overflow:auto;" class="sql">', '</pre></div>') },
								}),
							],
						})
					])
				]);
				return buttonGroup.render();
			},
			file: function (context) {
				const ui = $.summernote.ui;
				const tooltip = NGCMS.lang['tags.file'];
				const token = $('input[name="token"]').val();
				const button = ui.button({
					contents: `<i class="fas fa-file-upload" />`,
					tooltip: 'Загрузить файл',
					click: function (event) {
						const input = $('<input type="file" hidden style="display: none;" />');
						$(input).on('change', function (event) {
							if (!this.files || !this.files.length) {
								return false;
							}
							const formData = new FormData();
							formData.append('Filedata', this.files[0]);
							// ngAuthCookie: '{authcookie}',
							formData.append('uploadType', 'file');
							// category: $('#categorySelect').val(),
							// formData.append('rand', 1);
							// formData.append('replace', 0);
							$.ajax({
								method: 'POST',
								url: '/engine/rpc.php?methodName=admin.files.upload',
								headers: {
									'X-CSRF-TOKEN': token,
									'X-Requested-With': 'XMLHttpRequest',
								},
								data: formData,
								cache: false,
								contentType: false,
								processData: false,
								beforeSend: function () {
									ngShowLoading();
								},
							})
								.then(function (response) {
									if (!response.status) {
										throw new Error(`
											<h5>${NGCMS.lang['msge_error']} [${response.errorCode}]</h5>
											<p>${response.errorText}</p>
											<p>${response.errorDescription}</p>
										`);
									}
									return response;
								})
								.done(function (response, textStatus, jqXHR) {
									$('textarea.bb_code').summernote(
										'insertText',
										`[attach#${response.data.id}]${response.data.name}[/attach]`
									);
								})
								.fail(function (error) {
									ngNotifySticker(error.message || NGCMS.lang.rpc_httpError, {
										className: 'alert-danger',
										closeBTN: true
									});
								})
								.always(function () {
									ngHideLoading();
								});
						}).trigger('click');
					},
				});
				return button.render();
			},
			bbCode: function (context) {
				const ui = $.summernote.ui;
				const buttonGroup = ui.buttonGroup([
					ui.button({
						className: 'dropdown-toggle show ',
						tooltip: 'Допонительные теги',
						contents: '<i class="fa fa-quote-left" /> <span class="note-icon-caret"></span>',
						data: {
							toggle: 'dropdown',
						},
					}),
					ui.dropdown([
						ui.buttonGroup({
							className: 'note-align',
							children: [
								ui.button({
									contents: `<i class="fa fa-code" title="${NGCMS.lang['tags.code']}" />`,
									tooltip: 'Вставка кода без подсветки ',
									click: function (event) { insertBbCode(context, '<pre>', '</pre>') },
								}),
								ui.button({
									contents: `<i class="fas fa-at" title="${NGCMS.lang['tags.email']}" />`,
									tooltip: 'EMAIL',
									click: function (event) { insertBbCode(context, '[email]', '[/email]') },
								}),
								ui.button({
									contents: `<i class="fa fa-list-alt" title="${NGCMS.lang['tags.spoiler']}" />`,
									tooltip: 'Спойлер',
									click: function (event) { insertBbCode(context, '<div class="spoiler"><div class="sp-head" onclick="toggleSpoiler(this.parentNode, this);"><b></b>Раскрыть</div><div class="sp-body">', '</div></div>') },
								}),
								ui.button({
									contents: `<i class="fa fa-tags" title="${NGCMS.lang['tags.acronym']}" />`,
									tooltip: 'Акроним',
									click: function (event) { insertBbCode(context, '<acronym>', '<acronym>') },
								}),
								ui.button({
									contents: `<i class="fas fa-user-shield title="${NGCMS.lang['tags.hide']}" />`,
									tooltip: 'Блок для зарегистрированных',
									click: function (event) { insertBbCode(context, '[hide]', '[/hide]') },
								}),
								ui.button({
									contents: `<i class="fa fa-quote-left" title="${NGCMS.lang['tags.quote']}" />`,
									tooltip: 'Цитирование',
									click: function (event) { insertBbCode(context, '<blockquote>', '</blockquote>') },
								}),
							],
						})
					])
				]);
				return buttonGroup.render();
			},
			nextpage: function (context) {
				const ui = $.summernote.ui;
				const tooltip = NGCMS.lang['tags.nextpage'];
				const button = ui.button({
					className: 'note-codeview-keep',
					contents: `<i class="far fa-copy" />`,
					tooltip: tooltip,
					codeviewKeepButton: true,
					click: function (event) {
						return insertTextInCodeView(context, '<!--nextpage-->');
					},
				});
				return button.render();
			},
			more: function (context) {
				const ui = $.summernote.ui;
				const tooltip = NGCMS.lang['tags.more'];
				const button = ui.button({
					className: 'note-codeview-keep',
					contents: `<i class="fa fa-ellipsis-h" />`,
					tooltip: tooltip,
					codeviewKeepButton: true,
					click: function (event) {
						return insertTextInCodeView(context, '<!--more-->');
					},
				});
				return button.render();
			},
		},
		callbacks: {
			onImageUpload: function (files) {
				const currentEditorContainer = this;
				const token = $('input[name="token"]').val();
				// upload image to server and create imgNode...
				const formData = new FormData();
				formData.append('Filedata', files[0]);
				// ngAuthCookie: '{authcookie}',
				formData.append('uploadType', 'image');
				// category: $('#categorySelect').val(),
				formData.append('rand', 1);
				// replace: $('#flagReplace').is(':checked') ? 1 : 0,
				formData.append('thumb', 1);
				// stamp: $('#flagStamp').is(':checked') ? 1 : 0,
				// shadow: $('#flagShadow').is(':checked') ? 1 : 0
				$.ajax({
					method: 'POST',
					url: '/engine/rpc.php?methodName=admin.files.upload',
					headers: {
						'X-CSRF-TOKEN': token,
						'X-Requested-With': 'XMLHttpRequest',
					},
					data: formData,
					cache: false,
					contentType: false,
					processData: false,
					beforeSend: function () {
						ngShowLoading();
					},
				})
					.then(function (response) {
						if (!response.status) {
							throw new Error(`
								<h5>${NGCMS.lang['msge_error']} [${response.errorCode}]</h5>
								<p>${response.errorText}</p>
								<p>${response.errorDescription}</p>
							`);
						}
						return response;
					})
					.done(function (response, textStatus, jqXHR) {
						$(currentEditorContainer).summernote(
							'insertImage',
							`/uploads/images/${response.data.category}${response.data.name}`,
							function ($image) {
								$image.css('width', '100%');
							}
						);
					})
					.fail(function (error) {
						// title: `<h5>${NGCMS.lang.notifyWindowError}</h5>`,
						ngNotifySticker(error.message || NGCMS.lang.rpc_httpError, {
							className: 'alert-danger',
							closeBTN: true
						});
					})
					.always(function () {
						ngHideLoading();
					});
			}
		}
	});
});
