/**
 * DataTable Component
 */

var DataTableComponent = BaseComponent
		.extend({
			$ph : undefined,
			$rightPanel : undefined,
			isRightPanelShown : false,
			isInitialized : false,
			externalEditor : undefined,
			defaultButtons : [ {
				clazz : "save",
				label : "Save",
				callback : function() {
					this.save();
					if (typeof this.saveCallback === "function") {
						this.saveCallback();
					}

				}
			} ],
			template : function() {
				return "<div class='textEditorComponent'><div class='textEditorControls'>"
						+ "<div class='textEditorFile'><span class='fileLabel'>File: </span>{{file}}</div>"
						+ "<div class='textEditorButtons'>{{#buttons}}<button class='{{clazz}}'>{{label}}</button>{{/buttons}}</div>"
						+ "</div><div class='textEditorNotification'><span class='textEditorNotificationMsg'>Test</span></div>"
						+ "<div class='textEditorRightPanel'></div>"
						+ "<div class='textEditorIframeContainer'><div class='textEditorIframe'><iframe seamless='true' marginheight='0'></iframe></div>"
						+ "</div>"
			},

			/*
			 * // Default settings file: the file to edit
			 */

			initialize : function() {

				Dashboards.log("Initializing TextEditorComponent")
				this.isInitialized = true;

				// Do we have an htmlObject? if no, create one. If yes, setup
				// placeholder
				if (this.htmlObject) {
					this.$ph = $("#" + this.htmlObject);
				} else {
					this.$ph = $("<div id='textEditorDefautlId'></div>")
							.appendTo("body");
				}

			},

			update : function() {

				var myself = this;

				// TODO:
				if (this.parameter) {
					this.setFile(Dashboards.getParameterValue(this.parameter));
				}

				if (!this.isInitialized) {
					myself.initialize();
				}

				this.isRightPanelShown = false;

				// Render the correct structure
				var buttons = this.getButtons();

				this.$ph.html(Mustache.render(this.template(), {
					file : this.file || "Unknown file",
					buttons : buttons
				}));

				// bind
				this.$ph.find(".textEditorControls").on("click", "button",
						function() {
							var $this = $(this);
							var idx = $this.prevAll("button").length;

							buttons[idx].callback(arguments);
						})

				if (this.file) {
					this.loadFile();
				}

				// alert("Ok!");

			},

			getButtons : function() {

				var myself = this;
				var _extraButtons = this.extraButtons || [];
				_.chain(this.defaultButtons).each(function(b) {
					b.callback = _.bind(b.callback, myself);
				})
				return this.defaultButtons.concat(_extraButtons);

			},

			setFile : function(_file) {
				this.file = _file;
			},

			getFile : function() {
				return this.file;
			},

			loadFile : function() {

				var myself = this;

				// Disable button
				$('button.save', this.$ph).attr('disabled', true);

				this.externalEditor = $('iframe', this.$ph);
				var headerHeight = $('.textEditorControls', this.$ph).height()
						+ $('.textEditorNotification', this.$ph).height();
				var editorHeight = this.$ph.height() - headerHeight - 5;
				this.externalEditor.height(editorHeight);

				this.externalEditor.load(function() {

					var editorEnv = myself.getEditorWindow();
					editorEnv.listeners.onStatusUpdate = myself.setDirty;
					editorEnv.listeners.notify = function(msg, type) {
						myself.notify(msg);
					}

					$('#notifications').hide();
				});

				this.externalEditor.attr('src', "/pentaho"
						+ wd.helpers.editor.getUrl() + 'path=' + this.file
						+ '&theme=ace/theme/eclipse&editorOnly=true');// &width='+width
				// );

			},

			notify : function(msg, level /* todo */) {

				var $notifications = this.$ph
						.find(".textEditorNotificationMsg");
				$notifications.text(msg);
				$notifications.show().delay(4000).fadeOut('slow');
			},

			setDirty : function(isDirty) {
				$('button.save', this.$ph).attr('disabled', !isDirty);
			},

			getEditorWindow : function() {
				return this.externalEditor[0].contentWindow;
			},

			save : function() {

				this.getEditorWindow().save();

			},

			getRightPanel : function() {

				return this.$ph.find(".textEditorRightPanel");

			},

			toggleRightPanel : function() {

				this.getRightPanel().toggle();
				this.isRightPanelShown = !this.isRightPanelShown;

				// Force a resize on ace:
				this.getEditorWindow().editor.getEditor().resize();

				return this.isRightPanelShown;
			}
		});