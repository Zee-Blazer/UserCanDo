import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Button, IconButton} from "@material-tailwind/react";
import { BackIcon } from "@/assets/icons";

import { Clock9, Trash2, X } from 'lucide-react';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import CodeBlock from '@tiptap/extension-code-block';
import Strike from '@tiptap/extension-strike';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import {toast} from "react-toastify";

import { useAppContext } from '@/app/context';

interface IBottomDrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
    initialContent?: string;
    onSave?: (content: string) => void;
    noteTitle?: string;
    setNoteTitle: (title: string) => void;
    autoSaveDelay?: number;
    deleteNote?: () => void,
    setReminder?: () => void,
    openDueDate?: (data: string[]) => void
}

export default function BottomDrawer({
                                         open,
                                         onClose,
                                         title = "Notes",
                                         children,
                                         initialContent = "",
                                         onSave,
                                         noteTitle,
                                         setNoteTitle,
                                         autoSaveDelay = 1500,
                                         deleteNote,
                                         setReminder,
                                         openDueDate
                                     }: IBottomDrawerProps) {


    // Track whether the component should be rendered at all
    const [isVisible, setIsVisible] = useState(open);
    // Track whether the drawer should be visually positioned on-screen
    const [isOnScreen, setIsOnScreen] = useState(open);
    // Track if the format dropdown is open
    const [formatDropdownOpen, setFormatDropdownOpen] = useState(false);
    // Track DOT is open
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
    // Track if link menu is open
    const [linkMenuOpen, setLinkMenuOpen] = useState(false);
    // Store URL for link input
    const [linkUrl, setLinkUrl] = useState('');

    // Dark Mode
    const { isDarkMode } = useAppContext();

    // Input Ref
    const inputRef = useRef<HTMLInputElement>(null);

    // console.log(initialContent, "This is the initial content")

    const debouncedSave = useCallback(
        // debounce function that will call onSave after delay
        (() => {
            let timer: NodeJS.Timeout | null = null;
            return (content: string) => {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    if (onSave) onSave(content);
                }, autoSaveDelay);
            };
        })(),
        [onSave, autoSaveDelay]
    );

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write Note Here...',
                showOnlyCurrent: false,
                showOnlyWhenEditable: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
            }),
            // History,
            Link.configure({
                openOnClick: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    class: 'text-pry underline cursor-pointer',
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
                defaultProtocol: 'https',
                protocols: ['http', 'https', 'mailto', 'tel', 'ftp'],
                autolink: true,
                shouldAutoLink: href => /^https?:\/\//.test(href),
            }),
            Image,
            Document,
            Underline,
            Strike,
            CodeBlock,
            Highlight
        ],
        content: initialContent,
        autofocus: true,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert prose-sm sm:prose-base h-full focus:outline-none w-full max-w-none p-4 overflow-auto',
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            debouncedSave(html)
        }
    });

    // Make Focus at entry
    useEffect(() => {
        const timeout = setTimeout(() => {
          inputRef.current?.focus();
        }, 50); // Give time for all DOM to settle
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (editor) {
            // Add a click handler to the editor to handle link clicks
            const editorElement = document.querySelector('.ProseMirror');

            const handleClick = (e: Event) => {
                // Need to cast e to MouseEvent first
                const mouseEvent = e as MouseEvent;
                // Then cast the target
                const target = mouseEvent.target as HTMLElement;

                if (target.tagName === 'A') {
                    mouseEvent.preventDefault();
                    const href = target.getAttribute('href');
                    if (href) {
                        window.open(href, '_blank', 'noopener,noreferrer');
                    }
                }
            };

            editorElement?.addEventListener('click', handleClick);

            return () => {
                editorElement?.removeEventListener('click', handleClick);
            };
        }
    }, [editor]);

    const convertListToTasks = () => {
        if (!editor) return;

        const tasks: string[] = [];

        // Function to extract text content from a node and its descendants
        const getNodeText = (node: any): string => {
            if (!node) return '';

            // If it's a text node, return its text content
            if (node.type === 'text') {
                return node.text || '';
            }

            // If node has content, recursively extract text from all content nodes
            if (node.content && Array.isArray(node.content)) {
                return node.content.map(getNodeText).join('');
            }

            return '';
        };

        // Get the JSON representation of the document
        const doc = editor.getJSON();
        // console.log('Document structure:', JSON.stringify(doc, null, 2));

        // Find list nodes in the document
        if (doc && doc.content) {
            doc.content.forEach(node => {
                // Check if this node is a bullet list or ordered list
                if (node.type === 'bulletList' || node.type === 'orderedList') {
                    // console.log('Found list node:', node.type);

                    // Process each list item
                    if (node.content) {
                        node.content.forEach(listItem => {
                            if (listItem.type === 'listItem' && listItem.content) {
                                // Extract text from this list item and all its children
                                const taskText = getNodeText(listItem).trim();
                                // console.log('Extracted task text:', taskText);

                                if (taskText) {
                                    tasks.push(taskText);
                                }
                            }
                        });
                    }
                }
            });
        }

        // console.log('All extracted tasks:', tasks);

        // Call the onTaskCreate callback with the extracted tasks
        if (tasks.length > 0) {
            // onTaskCreate(tasks, noteTitle || undefined);
            // console.log(tasks, "These are the tasks to create");

            openDueDate?.(tasks);

            // Provide user feedback that tasks were created
            // toast.success(`${tasks.length} tasks created successfully!`);

            // Optionally close the drawer after task creation
            // onClose();
        } else {
            // No tasks found or unable to create tasks
            toast.info('No list items found to convert to tasks.');

            // Debug info to help understand the document structure
            console.log('Document structure:', JSON.stringify(doc, null, 2));
        }
    };

    // Improved link handling function
    const handleSetLink = () => {
        if (!editor) return;

        // Process the URL (add https:// if missing)
        let url = linkUrl;
        if (url && !/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }

        if (!url || url === 'https://') {
            // If URL is empty, unset the link
            editor.chain().focus().unsetLink().run();
        } else {
            // Set link with provided URL
            editor.chain().focus().setLink({ href: url }).run();
        }

        setLinkMenuOpen(false);
        setLinkUrl('');
    };

    // Function to toggle link menu and prepare URL if editing existing link
    const toggleLinkMenu = () => {
        if (!editor) return;

        // If opening the menu, check if we have an active link to edit
        if (!linkMenuOpen) {
            if (editor.isActive('link')) {
                const attrs = editor.getAttributes('link');
                setLinkUrl(attrs.href || '');
            } else {
                setLinkUrl('');
            }
        }

        setLinkMenuOpen(!linkMenuOpen);
    };

    // Handle applying heading styles
    const handleHeadingChange = (level: any) => {
        if (editor) {
            editor.chain().focus().toggleHeading({ level }).run();
            console.log("Editor State (after toggleHeading " + level + "):", editor.getJSON());
            setFormatDropdownOpen(false);
        }
    };

    // Handle toggling paragraph style
    const handleSetParagraph = () => {
        if (editor) {
            editor.chain().focus().setParagraph().run();
            console.log("Editor State (after setParagraph):", editor.getJSON());
            setFormatDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (open) {
            // First make the drawer visible in the DOM (but still off-screen)
            setIsVisible(true);

            // Use requestAnimationFrame to ensure DOM has updated before starting animation
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // After a frame, trigger the animation to slide in
                    setIsOnScreen(true);
                });
            });
        } else {
            // Start sliding out immediately
            setIsOnScreen(false);

            // Wait for animation to complete before removing from DOM
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300); // Match transition duration
            return () => clearTimeout(timer);
        }
    }, [open]);

    // Save the stuffs when the drawer is closing
    useEffect(() => {
        if (!isOnScreen && isVisible && onSave && editor) {
            // Final save before closing
            onSave(editor.getHTML());
        }
    }, [isOnScreen, isVisible, onSave, editor]);

    // Close dropdowns when clicking outside - but not for link menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // For format dropdown
            if (!event.target || !(event.target as Element).closest('.format-dropdown-container')) {
                setFormatDropdownOpen(false);
            }

            // We don't handle link menu here anymore - it has its own handlers
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Add a separate effect for handling link menu clicks outside
    useEffect(() => {
        if (!linkMenuOpen) return;

        const handleLinkMenuClickOutside = (event: MouseEvent) => {
            // If the link menu is open and we click outside it and not on the link button
            const linkMenuElement = document.querySelector('.link-menu-container');
            const linkButtonElement = document.querySelector('.link-button');

            if (
                linkMenuElement &&
                !linkMenuElement.contains(event.target as Node) &&
                linkButtonElement &&
                !linkButtonElement.contains(event.target as Node)
            ) {
                setLinkMenuOpen(false);
            }
        };

        // Use a short timeout to ensure this handler runs after other click handlers
        setTimeout(() => {
            document.addEventListener('mousedown', handleLinkMenuClickOutside);
        }, 100);

        return () => {
            document.removeEventListener('mousedown', handleLinkMenuClickOutside);
        };
    }, [linkMenuOpen]);

    // Don't render anything if not visible and closed
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 dark:bg-black bg-white transition-opacity duration-300 ${
                    isOnScreen ? "opacity-50" : "opacity-0"
                }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`absolute bottom-0 left-0 right-0 dark:bg-gray_5 bg-gray_1 p-5 rounded-t-lg shadow-lg transform transition-transform duration-300 ease-out flex flex-col ${
                    isOnScreen ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ height: '90vh' }}
            >
                {/* Handle/pill for better mobile UX */}
                <div className="flex sm:hidden justify-center pt-2">
                    <div className="w-12 h-1 bg-gray_4 rounded-full"></div>
                </div>

                {/* Header with title and back button */}
                <div className="flex justify-between items-center gap-5 flex-row mb-2">
                    <div className="flex flex-row items-center gap-3">
                        <IconButton variant="text" color={ isDarkMode ? "white" : "black" } onClick={onClose}>
                            <X />
                        </IconButton>
                        <p className='text-black dark:text-white text-[24px] font-semibold'>
                            {title}
                        </p>
                    </div>

                    {/* WYSIWYG Full Toolbar */}
                    <div className="flex items-center gap-1 p-1 rounded-md bg-transparent text-gray-800 dark:text-white">
                        {/* Undo and Redo Button */}
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().undo().run()}
                            title="Undo"
                            disabled={!editor?.can().undo()}
                        >
                            <UndoIcon/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().redo().run()}
                            title="Redo"
                            disabled={!editor?.can().redo()}
                        >
                            <RedoIcon/>
                        </ToolbarButton>
                        {/* Normal text dropdown */}
                        <div className="relative group format-dropdown-container" onClick={(e) => {
                            e.stopPropagation();
                            setFormatDropdownOpen(!formatDropdownOpen);
                        }}>
                            <button className="px-2 py-1 flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                                <span>
                                    {editor?.isActive('heading', { level: 1 }) ? 'Heading 1' :
                                        editor?.isActive('heading', { level: 2 }) ? 'Heading 2' :
                                            editor?.isActive('heading', { level: 3 }) ? 'Heading 3' :
                                                'Normal text'}
                                </span>
                                <ChevronDownIcon/>
                            </button>

                            {formatDropdownOpen && (
                                <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-10 min-w-[180px]">
                                    <button
                                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${editor?.isActive('paragraph') ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSetParagraph();
                                        }}
                                    >
                                        Normal text
                                    </button>
                                    <button
                                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${editor?.isActive('heading', { level: 1 }) ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleHeadingChange(1);
                                        }}
                                    >
                                        Heading 1
                                    </button>
                                    <button
                                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleHeadingChange(2);
                                        }}
                                    >
                                        Heading 2
                                    </button>
                                    <button
                                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${editor?.isActive('heading', { level: 3 }) ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleHeadingChange(3);
                                        }}
                                    >
                                        Heading 3
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"/>

                        {/* Text alignment */}
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                            isActive={editor?.isActive({ textAlign: 'left' }) || !editor?.isActive({ textAlign: 'center' }) && !editor?.isActive({ textAlign: 'right' }) && !editor?.isActive({ textAlign: 'justify' })}
                            title="Align Left"
                        >
                            <AlignLeftIcon/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                            isActive={editor?.isActive({ textAlign: 'center' })}
                            title="Align Center"
                        >
                            <AlignCenterIcon/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                            isActive={editor?.isActive({ textAlign: 'right' })}
                            title="Align Right"
                        >
                            <AlignRightIcon/>
                        </ToolbarButton>

                        <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"/>


                        {/* Text formatting */}
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().toggleBold().run()}
                            isActive={editor?.isActive('bold')}
                            title="Bold"
                        >
                            <BoldIcon/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                            isActive={editor?.isActive('italic')}
                            title="Italic"
                        >
                            <ItalicIcon/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().toggleUnderline().run()}
                            isActive={editor?.isActive('underline')}
                            title="Underline"
                        >
                            <UnderlineIcon/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().toggleStrike().run()}
                            isActive={editor?.isActive('strike')}
                            title="Strikethrough"
                        >
                            <StrikethroughIcon/>
                        </ToolbarButton>

                        <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"/>

                        {/* Link - Added class for identification */}
                        <div className="relative link-button">
                            <ToolbarButton
                                onClick={(e) => {
                                    if(!e) return;
                                    e.stopPropagation();
                                    toggleLinkMenu();
                                }}
                                isActive={editor?.isActive('link')}
                                title={editor?.isActive('link') ? "Edit Link" : "Add Link"}
                            >
                                <LinkIcon/>
                            </ToolbarButton>

                            {linkMenuOpen && (
                                <div
                                    className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md p-3 z-10 min-w-[280px] link-menu-container"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            URL
                                        </label>
                                        <input
                                            type="text"
                                            value={linkUrl}
                                            onChange={(e) => setLinkUrl(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pry dark:bg-gray-700 dark:text-white"
                                            placeholder="https://example.com"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleSetLink();
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        {editor?.isActive('link') && (
                                            <button
                                                onClick={() => {
                                                    editor.chain().focus().unsetLink().run();
                                                    setLinkMenuOpen(false);
                                                }}
                                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                                            >
                                                Remove Link
                                            </button>
                                        )}
                                        <div className="flex ml-auto gap-2">
                                            <button
                                                onClick={() => setLinkMenuOpen(false)}
                                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSetLink}
                                                className="px-3 py-1 bg-pry text-white rounded-md text-sm"
                                            >
                                                {editor?.isActive('link') ? 'Update' : 'Create'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* List types */}
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().toggleBulletList().run()}
                            isActive={editor?.isActive('bulletList')}
                            title="Bullet List"
                        >
                            <BulletListIcon/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                            isActive={editor?.isActive('orderedList')}
                            title="Ordered List"
                        >
                            <OrderedListIcon/>
                        </ToolbarButton>
                        <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"/>

                        {/* Code formatting */}
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().toggleCode().run()}
                            isActive={editor?.isActive('code')}
                            title="Inline Code"
                        >
                            <CodeIcon/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                            isActive={editor?.isActive('codeBlock')}
                            title="Code Block"
                        >
                            <CodeBlockIcon/>
                        </ToolbarButton>

                        <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"/>

                        {/* More actions dropdown */}
                        <div
                            className="relative"
                            onClick={(e) => {
                                e.stopPropagation();
                                setMoreDropdownOpen(!moreDropdownOpen);
                            }}
                        >
                            <button className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                                <MoreIcon />
                            </button>

                            {moreDropdownOpen && (
                                <div
                                    className="absolute bg-white mt-1 py-1 px-1.5 -ml-24 shadow-md rounded-md z-10"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div 
                                        className='flex text-blue-300 hover:text-blue-600 items-center my-0.5 mx-1 py-1 cursor-pointer border-b'
                                        onClick={ setReminder }
                                    >
                                        <Clock9 size={12} />
                                        <p className='text-sm ml-1'>Set Reminder</p>
                                    </div>
                                    <div 
                                        className='flex text-red-400 hover:text-red-600 items-center my-0.5 mx-1 py-1 cursor-pointer border-b'
                                        onClick={ deleteNote }
                                    >
                                        <Trash2 size={12} />
                                        <p className='text-sm ml-1'>Delete</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Editor Content Area */}
                <div className=" flex-grow flex-1 overflow-auto bg-transparent mt-2">
                    <input
                        ref={inputRef}
                        type={"text"}
                        className={"w-full py-4 bg-transparent px-4 font-bold text-[24px] outline-none border-none"}
                        placeholder={"Enter Note Title"}
                        value={noteTitle}
                        maxLength={40}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <EditorContent editor={editor}  />
                </div>

                {/* Convert to task button */}
                {(editor?.isActive('bulletList') || editor?.isActive('orderedList')) && (
                    <Button
                        onClick={convertListToTasks}
                        className={`absolute bottom-10 left-10 z-50 border-pry border-solid border-[1px] bg-pry hover:bg-transparent hover:text-black dark:hover:text-white text-white py-4 px-6 lowercase first-letter:capitalize w-fit`}
                    >
                        Convert list to task.
                    </Button>
                )}
            </div>
        </div>
    );
}

// Toolbar Button Component
const ToolbarButton = ({
                           onClick,
                           isActive = false,
                           title,
                           children,
                            disabled = false
                       }: {
    onClick: (e?: React.MouseEvent) => void;
    isActive?: boolean;
    title: string;
    children: React.ReactNode;
    disabled?: boolean
}) => {
    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onClick(e);
            }}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title={title}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

// Icon Components
const BoldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
    </svg>
);

const ItalicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
    </svg>
);

const UnderlineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/>
    </svg>
);

const StrikethroughIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z"/>
    </svg>
);

const BulletListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
    </svg>
);

const OrderedListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
        <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>
    </svg>
);

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
    </svg>
);

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
    </svg>
);

const CodeBlockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
);

const AlignLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>
);

const AlignCenterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>
);

const AlignRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>
);

const MoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
    </svg>
);

const ImageIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.875 8.75C12.2458 8.75 12.6084 8.64003 12.9167 8.43401C13.225 8.22798 13.4654 7.93514 13.6073 7.59253C13.7492 7.24992 13.7863 6.87292 13.714 6.50921C13.6416 6.14549 13.463 5.8114 13.2008 5.54917C12.9386 5.28695 12.6045 5.10837 12.2408 5.03603C11.8771 4.96368 11.5001 5.00081 11.1575 5.14273C10.8149 5.28464 10.522 5.52496 10.316 5.83331C10.11 6.14165 10 6.50416 10 6.875C10 7.37228 10.1975 7.84919 10.5492 8.20083C10.9008 8.55246 11.3777 8.75 11.875 8.75ZM11.875 6.25C11.9986 6.25 12.1195 6.28666 12.2222 6.35533C12.325 6.42401 12.4051 6.52162 12.4524 6.63582C12.4997 6.75003 12.5121 6.87569 12.488 6.99693C12.4639 7.11817 12.4044 7.22953 12.3169 7.31694C12.2295 7.40435 12.1182 7.46388 11.9969 7.48799C11.8757 7.51211 11.75 7.49973 11.6358 7.45243C11.5216 7.40512 11.424 7.32501 11.3553 7.22223C11.2867 7.11945 11.25 6.99861 11.25 6.875C11.25 6.70924 11.3158 6.55027 11.4331 6.43306C11.5503 6.31585 11.7092 6.25 11.875 6.25Z"
            fill="white" fill-opacity="0.64"/>
        <path
            d="M16.25 2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5ZM16.25 16.25H3.75V12.5L6.875 9.375L10.3688 12.8687C10.603 13.1016 10.9198 13.2322 11.25 13.2322C11.5802 13.2322 11.897 13.1016 12.1313 12.8687L13.125 11.875L16.25 15V16.25ZM16.25 13.2312L14.0063 10.9875C13.772 10.7547 13.4552 10.624 13.125 10.624C12.7948 10.624 12.478 10.7547 12.2437 10.9875L11.25 11.9812L7.75625 8.4875C7.52205 8.25469 7.20523 8.12401 6.875 8.12401C6.54477 8.12401 6.22795 8.25469 5.99375 8.4875L3.75 10.7312V3.75H16.25V13.2312Z"
            fill="white" fill-opacity="0.64"/>
    </svg>

)

const UndoIcon = () => (
    <svg className={"h-[20px] w-[20px]"} width="28" height="28" viewBox="0 0 28 28" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16.5 10.25H8.88438L11.1263 8.00875L10.25 7.125L6.5 10.875L10.25 14.625L11.1263 13.7406L8.88625 11.5H16.5C17.4946 11.5 18.4484 11.8951 19.1517 12.5983C19.8549 13.3016 20.25 14.2554 20.25 15.25C20.25 16.2446 19.8549 17.1984 19.1517 17.9017C18.4484 18.6049 17.4946 19 16.5 19H11.5V20.25H16.5C17.8261 20.25 19.0979 19.7232 20.0355 18.7855C20.9732 17.8479 21.5 16.5761 21.5 15.25C21.5 13.9239 20.9732 12.6521 20.0355 11.7145C19.0979 10.7768 17.8261 10.25 16.5 10.25Z"
            fill="white" fill-opacity="0.4"/>
    </svg>

)

export const RedoIcon = () => (
    <svg className={"h-[20px] w-[20px]"} width="28" height="28" viewBox="0 0 28 28" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.5 10.25H19.1156L16.8737 8.00875L17.75 7.125L21.5 10.875L17.75 14.625L16.8737 13.7406L19.1137 11.5H11.5C10.5054 11.5 9.55161 11.8951 8.84835 12.5983C8.14509 13.3016 7.75 14.2554 7.75 15.25C7.75 16.2446 8.14509 17.1984 8.84835 17.9017C9.55161 18.6049 10.5054 19 11.5 19H16.5V20.25H11.5C10.1739 20.25 8.90215 19.7232 7.96447 18.7855C7.02678 17.8479 6.5 16.5761 6.5 15.25C6.5 13.9239 7.02678 12.6521 7.96447 11.7145C8.90215 10.7768 10.1739 10.25 11.5 10.25Z"
            fill="white" fill-opacity="0.64"/>
    </svg>
)