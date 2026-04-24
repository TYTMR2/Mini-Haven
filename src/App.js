import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';

// Character options organized by category
const CHARACTER_OPTIONS = {
  body: [
    { id: 'body-1', name: 'Skin 1', file: 'body-1.png', free: true },
    { id: 'body-2', name: 'Skin 2', file: 'body-2.png', free: true },
    { id: 'body-3', name: 'Skin 3', file: 'body-3.png', free: true },
    { id: 'body-4', name: 'Skin 4', file: 'body-4.png', free: true },
  ],
  eyes: [
    { id: 'eye-black', name: 'Black', file: 'eye-black.png', free: true },
    { id: 'eye-blue', name: 'Blue', file: 'eye-blue.png', free: true },
    { id: 'eye-brown', name: 'Brown', file: 'eye-brown.png', free: true },
    { id: 'eye-green', name: 'Green', file: 'eye-green.png', free: true },
    { id: 'eye-grey', name: 'Grey', file: 'eye-grey.png', free: true },
    { id: 'eye-purple', name: 'Purple', file: 'eye-purple.png', free: true },
    { id: 'eye-red', name: 'Red', file: 'eye-red.png', free: true },
  ],
  eyelashes: [
    { id: 'el-1', name: 'Style 1', file: 'el-1.png', free: true },
    { id: 'el-2', name: 'Style 2', file: 'el-2.png', free: true },
    { id: 'el-3', name: 'Style 3', file: 'el-3.png', free: true },
    { id: 'el-4', name: 'Style 4', file: 'el-4.png', free: true },
    { id: 'el-5', name: 'Style 5', file: 'el-5.png', free: true },
  ],
  eyebrows: [
    { id: 'eb-1', name: 'Style 1', file: 'eb-1.png', free: true },
    { id: 'eb-2', name: 'Style 2', file: 'eb-2.png', free: true },
    { id: 'eb-3', name: 'Style 3', file: 'eb-3.png', free: true },
    { id: 'eb-4', name: 'Style 4', file: 'eb-4.png', free: true },
    { id: 'eb-5', name: 'Style 5', file: 'eb-5.png', free: true },
  ],
  mouth: [
    { id: '6', name: 'Mouth 6', file: '6.png', free: false, price: 50 },
    { id: '7', name: 'Mouth 7', file: '7.png', free: false, price: 50 },
    { id: '8', name: 'Mouth 8', file: '8.png', free: false, price: 50 },
    { id: '9', name: 'Mouth 9', file: '9.png', free: false, price: 50 },
    { id: '10', name: 'Mouth 10', file: '10.png', free: false, price: 50 },
    { id: '11', name: 'Mouth 11', file: '11.png', free: false, price: 50 },
    { id: '12', name: 'Mouth 12', file: '12.png', free: false, price: 50 },
    { id: '13', name: 'Mouth 13', file: '13.png', free: false, price: 50 },
    { id: '14', name: 'Mouth 14', file: '14.png', free: false, price: 50 },
    { id: '15', name: 'Mouth 15', file: '15.png', free: false, price: 50 },
    { id: '16', name: 'Mouth 16', file: '16.png', free: false, price: 50 },
    { id: '17', name: 'Mouth 17', file: '17.png', free: false, price: 50 },
    { id: '18', name: 'Mouth 18', file: '18.png', free: false, price: 50 },
    { id: '19', name: 'Mouth 19', file: '19.png', free: false, price: 50 },
    { id: '20', name: 'Mouth 20', file: '20.png', free: false, price: 50 },
    { id: 'Mouth-1', name: 'Mouth 1', file: 'Mouth-1.png', free: false, price: 50 },
    { id: 'Mouth-2', name: 'Mouth 2', file: 'Mouth-2.png', free: false, price: 50 },
    { id: 'Mouth-3', name: 'Mouth 3', file: 'Mouth-3.png', free: false, price: 50 },
    { id: 'Mouth-4', name: 'Mouth 4', file: 'Mouth-4.png', free: false, price: 50 },
    { id: 'Mouth-5', name: 'Mouth 5', file: 'Mouth-5.png', free: false, price: 50 },
  ],
  hair: [
    { id: 'Hair-1', name: 'Hair 1', file: 'Hair-1.png', free: true },
    { id: 'Hair-1-bl', name: 'Hair 1 Blonde', file: 'Hair-1-bl.png', free: true },
    { id: 'Hair-1-br', name: 'Hair 1 Brown', file: 'Hair-1-br.png', free: true },
    { id: 'Hair-1-da', name: 'Hair 1 Dark', file: 'Hair-1-da.png', free: true },
    { id: 'Hair-1-gin', name: 'Hair 1 Ginger', file: 'Hair-1-gin.png', free: true },
    { id: 'Hair-2', name: 'Hair 2', file: 'Hair-2.png', free: true },
    { id: 'Hair-2-bl', name: 'Hair 2 Blonde', file: 'Hair-2-bl.png', free: true },
    { id: 'Hair-2-br', name: 'Hair 2 Brown', file: 'Hair-2-br.png', free: true },
    { id: 'Hair-2-da', name: 'Hair 2 Dark', file: 'Hair-2-da.png', free: true },
    { id: 'Hair-2-gin', name: 'Hair 2 Ginger', file: 'Hair-2-gin.png', free: true },
  ],
  hair_2: [
    { id: 'Hair_2-1', name: 'Back Hair 1', file: 'Hair_2-1.png', free: true },
    { id: 'Hair_2-1-bl', name: 'Back Hair 1 Blonde', file: 'Hair_2-1-bl.png', free: true },
    { id: 'Hair_2-1-br', name: 'Back Hair 1 Brown', file: 'Hair_2-1-br.png', free: true },
    { id: 'Hair_2-1-da', name: 'Back Hair 1 Dark', file: 'Hair_2-1-da.png', free: true },
    { id: 'Hair_2-1-gin', name: 'Back Hair 1 Ginger', file: 'Hair_2-1-gin.png', free: true },
    { id: 'Hair_2-2', name: 'Back Hair 2', file: 'Hair_2-2.png', free: true },
    { id: 'Hair_2-2-bl', name: 'Back Hair 2 Blonde', file: 'Hair_2-2-bl.png', free: true },
    { id: 'Hair_2-2-br', name: 'Back Hair 2 Brown', file: 'Hair_2-2-br.png', free: true },
    { id: 'Hair_2-2-gin', name: 'Back Hair 2 Ginger', file: 'Hair_2-2-gin.png', free: true },
    { id: 'Hair_2-2-da', name: 'Back Hair 2 Dark', file: 'Hair_2-2-da.png', free: true },
  ],
  bangs: [
  { id: 'Ban-1', name: 'Bangs 1', file: 'Ban-1.png', free: true },
  { id: 'Ban-1-bl', name: 'Bangs 1 Blonde', file: 'Ban-1-bl.png', free: true },
  { id: 'Ban-1-br', name: 'Bangs 1 Brown', file: 'Ban-1-br.png', free: true },
  { id: 'Ban-1-da', name: 'Bangs 1 Dark', file: 'Ban-1-da.png', free: true },
  { id: 'Ban-1-gin', name: 'Bangs 1 Ginger', file: 'Ban-1-gin.png', free: true },
  { id: 'Ban-2', name: 'Bangs 2', file: 'Ban-2.png', free: true },
  { id: 'Ban-2-bl', name: 'Bangs 2 Blonde', file: 'Ban-2-bl.png', free: true },
  { id: 'Ban-2-br', name: 'Bangs 2 Brown', file: 'Ban-2-br.png', free: true },
  { id: 'Ban-2-da', name: 'Bangs 2 Dark', file: 'Ban-2-da.png', free: true },
  { id: 'Ban-2-gin', name: 'Bangs 2 Ginger', file: 'Ban-2-gin.png', free: true },
  { id: 'Ban-3', name: 'Bangs 3', file: 'Ban-3.png', free: true },
  { id: 'Ban-3-bl', name: 'Bangs 3 Blonde', file: 'Ban-3-bl.png', free: true },
  { id: 'Ban-3-br', name: 'Bangs 3 Brown', file: 'Ban-3-br.png', free: true },
  { id: 'Ban-3-da', name: 'Bangs 3 Dark', file: 'Ban-3-da.png', free: true },
  { id: 'Ban-3-gin', name: 'Bangs 3 Ginger', file: 'Ban-3-gin.png', free: true },
],
  tops: [
    { id: 'top-1', name: 'Shirt 1', file: 'top-1.png', free: true },
    { id: 'top-2', name: 'Shirt 2', file: 'top-2.png', free: true },
    { id: 'top-3', name: 'Shirt 3', file: 'top-3.png', free: true },
    { id: 'top-4', name: 'Shirt 4', file: 'top-4.png', free: true },
    { id: 'top-5', name: 'Shirt 5', file: 'top-5.png', free: true },
    { id: 'top-6', name: 'Shirt 6', file: 'top-6.png', free: true },
    { id: 'top-7', name: 'Shirt 7', file: 'top-7.png', free: true },
    { id: '3-50tp', name: 'Premium Top 3', file: '3-50tp.png', free: false, price: 50 },
    { id: '7-100tp', name: 'Premium Top 7', file: '7-100tp.png', free: false, price: 100 },
    { id: '8-100tp', name: 'Premium Top 8', file: '8-100tp.png', free: false, price: 100 },
    { id: '9-100tp', name: 'Premium Top 9', file: '9-100tp.png', free: false, price: 100 },
    { id: '10-50tp', name: 'Premium Top 10', file: '10-50tp.png', free: false, price: 50 },
  ],
  bottoms: [
    { id: 'Bottom-1', name: 'Pants 1', file: 'Bottom-1.png', free: true },
    { id: 'Bottom-2', name: 'Pants 2', file: 'Bottom-2.png', free: true },
    { id: 'Bottom-3', name: 'Pants 3', file: 'Bottom-3.png', free: true },
    { id: 'Bottom-4', name: 'Pants 4', file: 'Bottom-4.png', free: true },
    { id: 'Bottom-5', name: 'Pants 5', file: 'Bottom-5.png', free: true },
    { id: '6-100bt', name: 'Premium Pants 6', file: '6-100bt.png', free: false, price: 100 },
    { id: '7-250bt', name: 'Premium Pants 7', file: '7-250bt.png', free: false, price: 250 },
    { id: '8-300bt', name: 'Premium Pants 8', file: '8-300bt.png', free: false, price: 300 },
  ],
  shoes: [
    { id: 'shoes-1', name: 'Shoes 1', file: 'shoes-1.png', free: true },
    { id: 'shoes-2', name: 'Shoes 2', file: 'shoes-2.png', free: true },
    { id: 'shoes-3', name: 'Shoes 3', file: 'shoes-3.png', free: true },
    { id: 'shoes-4', name: 'Shoes 4', file: 'shoes-4.png', free: true },
  ],
  accessories: [
    { id: '1-50gl', name: 'Gloves 1', file: 'Gloves/1-50gl.png', free: false, price: 50 },
    { id: '2-100gl', name: 'Gloves 2', file: 'Gloves/2-100gl.png', free: false, price: 100 },
    { id: '3-50gl', name: 'Gloves 3', file: 'Gloves/3-50gl.png', free: false, price: 50 },
    { id: '4-250gl', name: 'Gloves 4', file: 'Gloves/4-250gl.png', free: false, price: 250 },
    { id: '5-250gl', name: 'Gloves 5', file: 'Gloves/5-250gl.png', free: false, price: 250 },
    { id: '6-100gl', name: 'Gloves 6', file: 'Gloves/6-100gl.png', free: false, price: 100 },
  ],
};

// Initial inventory [free]
const FREE_ITEMS = Object.values(CHARACTER_OPTIONS)
  .flat()
  .filter(item => item.free)
  .map(item => item.id);


// Whiteboard start, draw [canvas], write [textarea]
function WhiteboardModal({ roomId, roomData, onClose }) {
  const [pages, setPages] = useState([{ id: 'page-1', name: 'Page 1', drawing_data: [], document_text: '' }]);
  const [currentPage, setCurrentPage] = useState('page-1');
  const [editingPageId, setEditingPageId] = useState(null);
  const [whiteboardMode, setWhiteboardMode] = useState('draw'); 
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [currentTool, setCurrentTool] = useState('pen'); 

  // Canvas refs
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const currentStrokeRef = useRef(null);
  const lastSaveRef = useRef(Date.now());
  const lastEditRef = useRef(0); 
  const isTypingRef = useRef(false); 
  const lastDrawnDataRef = useRef(null);
  const pagesRef = useRef(pages);
  const currentPageRef = useRef(currentPage);
  const hasLoadedInitialRef = useRef(false);

  // keep refs synced
  useEffect(() => { pagesRef.current = pages; }, [pages]);
  useEffect(() => { currentPageRef.current = currentPage; }, [currentPage]);

  // Load initial pages from room data [once]
  useEffect(() => {
    // if already loaded skip, dont overwrite
    if (hasLoadedInitialRef.current) return;
    // If room has whiteboard data, restore
    if (roomData?.whiteboard_pages && Array.isArray(roomData.whiteboard_pages) && roomData.whiteboard_pages.length > 0) {
      setPages(roomData.whiteboard_pages);
      setCurrentPage(roomData.whiteboard_pages[0].id);
      hasLoadedInitialRef.current = true;
    }
  }, [roomData?.whiteboard_pages]);

  // Poll for collaborator updates every 2 secs
  //dont interrupt typing or drawing 
  useEffect(() => {
    if (!roomId) return;

    const interval = setInterval(async () => {
      if (isDrawingRef.current) return;
      if (isTypingRef.current) return;
      if (Date.now() - lastEditRef.current < 3000) return;
      if (Date.now() - lastSaveRef.current < 3000) return;

      const { data } = await supabase
        .from('rooms')
        .select('whiteboard_pages')
        .eq('id', roomId)
        .single();

      if (data?.whiteboard_pages && Array.isArray(data.whiteboard_pages)) {
        const incoming = JSON.stringify(data.whiteboard_pages);
        const current = JSON.stringify(pagesRef.current);
        if (incoming === current) return;

        const localCurrent = pagesRef.current.find(p => p.id === currentPageRef.current);
        const incomingCurrent = data.whiteboard_pages.find(p => p.id === currentPageRef.current);
        if (
          localCurrent && incomingCurrent &&
          (incomingCurrent.document_text || '').length < (localCurrent.document_text || '').length &&
          Date.now() - lastEditRef.current < 10000
        ) {
          return;
        }

        setPages(data.whiteboard_pages);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [roomId]);                                                            

  // Redraw canvas when page data change
  useEffect(() => {
    if (!canvasRef.current || whiteboardMode !== 'draw') return;

    const page = pages.find(p => p.id === currentPage);
    const drawingDataString = JSON.stringify(page?.drawing_data || []);

    if (drawingDataString === lastDrawnDataRef.current) return;
    if (isDrawingRef.current) return;

    lastDrawnDataRef.current = drawingDataString;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (page?.drawing_data && Array.isArray(page.drawing_data)) {
      page.drawing_data.forEach(stroke => {
        if (stroke && stroke.points && stroke.points.length >= 2) {
          ctx.beginPath();
          ctx.strokeStyle = stroke.color || '#000000';
          ctx.lineWidth = stroke.size || 3;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          if (stroke.tool === 'eraser') {
            ctx.strokeStyle = '#ffffff';
          }

          ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
          for (let i = 1; i < stroke.points.length; i++) {
            ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
          }
          ctx.stroke();
        }
      });
    }
  }, [pages, currentPage, whiteboardMode]);

  // Converting mouse positions to canvas coordinates
  const handleMouseDown = (e) => {
    if (!canvasRef.current) return;
    isDrawingRef.current = true;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    currentStrokeRef.current = {
      tool: currentTool,
      color: selectedColor,
      size: brushSize,
      points: [{ x, y }]
    };
  };


  // Track mouse movement while drawing
  const handleMouseMove = (e) => {
    if (!isDrawingRef.current || !currentStrokeRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    currentStrokeRef.current.points.push({ x, y });

    const points = currentStrokeRef.current.points;
    const len = points.length;
    if (len >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = currentStrokeRef.current.color;
      ctx.lineWidth = currentStrokeRef.current.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (currentStrokeRef.current.tool === 'eraser') {
        ctx.strokeStyle = '#ffffff';
      }

      ctx.moveTo(points[len - 2].x, points[len - 2].y);
      ctx.lineTo(points[len - 1].x, points[len - 1].y);
      ctx.stroke();
    }
  };
// complete stroke and save pages to database
// prevent the redraw effect from wiping/redrawing
  const handleMouseUp = async () => {
    if (!isDrawingRef.current || !currentStrokeRef.current) return;
    isDrawingRef.current = false;
    lastEditRef.current = Date.now();

    const page = pagesRef.current.find(p => p.id === currentPageRef.current) || pagesRef.current[0];
    const updatedPage = {
      ...page,
      drawing_data: [...(page.drawing_data || []), currentStrokeRef.current]
    };
    const updatedPages = pagesRef.current.map(p => p.id === currentPageRef.current ? updatedPage : p);

  
    lastDrawnDataRef.current = JSON.stringify(updatedPage.drawing_data);

    setPages(updatedPages);
    lastSaveRef.current = Date.now();
    try {
      await supabase
        .from('rooms')
        .update({ whiteboard_pages: updatedPages })
        .eq('id', roomId);
    } catch (error) {
      console.error('Failed to save stroke:', error);
    }

    currentStrokeRef.current = null;
  };

  // Clear everything visually and remove everything from the database
  const clearCanvas = async () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const page = pages.find(p => p.id === currentPage) || pages[0];
    const updatedPage = { ...page, drawing_data: [] };
    const updatedPages = pages.map(p => p.id === currentPage ? updatedPage : p);
    setPages(updatedPages);

    lastSaveRef.current = Date.now();
    await supabase
      .from('rooms')
      .update({ whiteboard_pages: updatedPages })
      .eq('id', roomId);
  };

  // Remove last stroke, update state and database
  const undoStroke = async () => {
    const page = pages.find(p => p.id === currentPage) || pages[0];
    if (!page?.drawing_data || page.drawing_data.length === 0) return;

    const updatedPage = { ...page, drawing_data: page.drawing_data.slice(0, -1) };
    const updatedPages = pages.map(p => p.id === currentPage ? updatedPage : p);
    setPages(updatedPages);

    lastSaveRef.current = Date.now();
    await supabase
      .from('rooms')
      .update({ whiteboard_pages: updatedPages })
      .eq('id', roomId);
  };

  //  Update documemt [text]
  const updateDocText = (text) => {
    lastEditRef.current = Date.now();

    setPages(prev => {
      const updated = prev.map(p =>
        p.id === currentPageRef.current
          ? { ...p, document_text: text }
          : p
      );
      pagesRef.current = updated;
      return updated;
    });

    clearTimeout(window.whiteboardSaveTimer);
    window.whiteboardSaveTimer = setTimeout(async () => {
      lastSaveRef.current = Date.now();
      await supabase
        .from('rooms')
        .update({ whiteboard_pages: pagesRef.current })
        .eq('id', roomId);
    }, 1500);
  };

  const addNewPage = async () => {
    const newId = `page-${Date.now()}`;
    const newPage = { id: newId, name: `Page ${pages.length + 1}`, drawing_data: [], document_text: '' };
    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    setCurrentPage(newId);

    lastSaveRef.current = Date.now();
    await supabase
      .from('rooms')
      .update({ whiteboard_pages: updatedPages })
      .eq('id', roomId);
  };

  const deletePage = async (pageId) => {
    if (pages.length === 1) {
      alert('Cannot delete the last page');
      return;
    }
    const updatedPages = pages.filter(p => p.id !== pageId);
    setPages(updatedPages);
    if (currentPage === pageId) setCurrentPage(updatedPages[0].id);

    lastSaveRef.current = Date.now();
    await supabase
      .from('rooms')
      .update({ whiteboard_pages: updatedPages })
      .eq('id', roomId);
  };

  const renamePage = async (pageId, newName) => {
    if (!newName || newName.trim() === '') {
      setEditingPageId(null);
      return;
    }
    const updatedPages = pages.map(p => p.id === pageId ? { ...p, name: newName } : p);
    setPages(updatedPages);
    setEditingPageId(null);

    lastSaveRef.current = Date.now();
    await supabase
      .from('rooms')
      .update({ whiteboard_pages: updatedPages })
      .eq('id', roomId);
  };

  const presetColors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];
  const pageCurrent = pages.find(p => p.id === currentPage) || pages[0];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '20px', width: '95%', height: '90vh', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Whiteboard</h2>
          <button onClick={onClose} style={{ background: '#ddd', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕ Close</button>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px', flex: 1, overflow: 'hidden' }}>

          {/* Left Sidebar: Pages */}
          <div style={{ background: '#f5f5f5', borderRadius: '10px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Pages</h3>
            {pages.map(page => (
              <div key={page.id} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {editingPageId === page.id ? (
                  <input
                    type="text"
                    defaultValue={page.name}
                    onBlur={(e) => renamePage(page.id, e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && renamePage(page.id, e.target.value)}
                    autoFocus
                    style={{ flex: 1, padding: '5px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '12px' }}
                  />
                ) : (
                  <button
                    onClick={() => setCurrentPage(page.id)}
                    onDoubleClick={() => setEditingPageId(page.id)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: currentPage === page.id ? '#9333ea' : 'white',
                      color: currentPage === page.id ? 'white' : '#333',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      textAlign: 'left'
                    }}
                  >
                    {page.name}
                  </button>
                )}
                <button
                  onClick={() => deletePage(page.id)}
                  style={{ background: '#ff4444', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 8px', cursor: 'pointer', fontSize: '12px' }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addNewPage}
              style={{ padding: '10px', background: '#9333ea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              + Add Page
            </button>
          </div>

          {/* Right: Whiteboard */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', overflow: 'hidden' }}>

            {/* Mode Tabs */}
            <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid #e0e0e0', paddingBottom: '10px' }}>
              <button
                onClick={() => setWhiteboardMode('draw')}
                style={{
                  padding: '10px 30px',
                  background: whiteboardMode === 'draw' ? '#9333ea' : 'transparent',
                  color: whiteboardMode === 'draw' ? 'white' : '#666',
                  fontWeight: whiteboardMode === 'draw' ? 'bold' : 'normal',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Draw
              </button>
              <button
                onClick={() => setWhiteboardMode('write')}
                style={{
                  padding: '10px 30px',
                  background: whiteboardMode === 'write' ? '#9333ea' : 'transparent',
                  color: whiteboardMode === 'write' ? 'white' : '#666',
                  fontWeight: whiteboardMode === 'write' ? 'bold' : 'normal',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Write
              </button>
            </div>

            {/* Drawing Tools */}
            {whiteboardMode === 'draw' && (
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', padding: '15px', background: '#f5f5f5', borderRadius: '10px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button
                    onClick={() => setCurrentTool('pen')}
                    style={{
                      padding: '8px 15px',
                      background: currentTool === 'pen' ? '#9333ea' : 'white',
                      color: currentTool === 'pen' ? 'white' : '#333',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Pen
                  </button>
                  <button
                    onClick={() => setCurrentTool('eraser')}
                    style={{
                      padding: '8px 15px',
                      background: currentTool === 'eraser' ? '#9333ea' : 'white',
                      color: currentTool === 'eraser' ? 'white' : '#333',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                     Eraser
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Size:</span>
                  {[1, 3, 5, 8].map(size => (
                    <button
                      key={size}
                      onClick={() => setBrushSize(size)}
                      style={{
                        width: '40px',
                        height: '40px',
                        background: brushSize === size ? '#9333ea' : 'white',
                        border: '2px solid #ddd',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <div style={{ width: size * 2, height: size * 2, background: brushSize === size ? 'white' : '#333', borderRadius: '50%' }} />
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Color:</span>
                  {presetColors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: '30px',
                        height: '30px',
                        background: color,
                        border: selectedColor === color ? '3px solid #9333ea' : '2px solid #ddd',
                        borderRadius: '50%',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    style={{ width: '40px', height: '40px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                  <button
                    onClick={undoStroke}
                    style={{ padding: '8px 15px', background: '#fbbf24', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    ↶ Undo
                  </button>
                  <button
                    onClick={clearCanvas}
                    style={{ padding: '8px 15px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Canvas/Textarea */}
            <div style={{ flex: 1, border: '2px solid #ddd', borderRadius: '10px', overflow: 'hidden', background: 'white' }}>
              {whiteboardMode === 'draw' ? (
                <canvas
                  ref={canvasRef}
                  width={1200}
                  height={600}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }}
                />
              ) : (
                <textarea
                  value={pageCurrent?.document_text || ''}
                  onChange={(e) => updateDocText(e.target.value)}
                  onFocus={() => { isTypingRef.current = true; }}
                  onBlur={() => {
                    isTypingRef.current = false;
                    if (window.whiteboardSaveTimer) {
                      clearTimeout(window.whiteboardSaveTimer);
                      window.whiteboardSaveTimer = null;
                      lastSaveRef.current = Date.now();
                      supabase
                        .from('rooms')
                        .update({ whiteboard_pages: pagesRef.current })
                        .eq('id', roomId)
                        .then(() => {});
                    }
                  }}
                  placeholder="Start typing..."
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '20px',
                    border: 'none',
                    fontSize: '16px',
                    fontFamily: 'Arial, sans-serif',
                    resize: 'none',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState('login'); // 
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // App state
  const [view, setView] = useState('home');
  const [userName, setUserName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [users, setUsers] = useState([]);
  const [studyMinutes, setStudyMinutes] = useState('25');
  const [breakMinutes, setBreakMinutes] = useState('5');
  const timerRef = useRef(null);

  // Character state
  const [selectedBody, setSelectedBody] = useState('body-1');
  const [selectedEyes, setSelectedEyes] = useState('eye-black');
  const [selectedEyelashes, setSelectedEyelashes] = useState('el-1');
  const [selectedEyebrows, setSelectedEyebrows] = useState('eb-1');
  const [selectedMouth, setSelectedMouth] = useState('6');
  const [selectedHair, setSelectedHair] = useState('Hair-1');
  const [selectedHair2, setSelectedHair2] = useState('Hair_2-1');
  const [selectedBangs, setSelectedBangs] = useState(null);
  const [selectedTop, setSelectedTop] = useState('top-1');
  const [selectedBottom, setSelectedBottom] = useState('Bottom-1');
  const [selectedShoes, setSelectedShoes] = useState('shoes-1');
  const [selectedAccessories, setSelectedAccessories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('body');
  const [showCharacterCreator, setShowCharacterCreator] = useState(false);

  // Shop & Wardrobe state
  const [showShop, setShowShop] = useState(false);
  const [showWardrobe, setShowWardrobe] = useState(false);
  const [confirmPurchase, setConfirmPurchase] = useState(null);
  const [shopPreviewItem, setShopPreviewItem] = useState(null);

  const [showWhiteboard, setShowWhiteboard] = useState(false);

  // Session restore state:
  const [isRestoringSession, setIsRestoringSession] = useState(true);

  // Restore user session and room connection from localStorage
useEffect(() => {
  const savedUserId = localStorage.getItem('user_id');
  const savedRoomId = localStorage.getItem('room_id');
  const savedUserName = localStorage.getItem('user_name');

  // If no saved session show login screen
  if (!savedUserId) {
    setIsRestoringSession(false);
    return;
  }
// verify session is still valid
  (async () => {
    try {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', savedUserId)
        .single();

      // If usr doesnt exist or deleted, clear up
      if (userError || !user) {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_name');
        localStorage.removeItem('room_id');
        setIsRestoringSession(false);
        return;
      }

      // Restore authenticated user state
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserName(savedUserName || user.username);

      // Attempt to restore room connection if user was in a room
      if (savedRoomId) {
        const { data: room } = await supabase
          .from('rooms')
          .select('*')
          .eq('id', savedRoomId)
          .single();

        // if room still exists, restore 
        if (room) {
          const { data: myRow } = await supabase
            .from('room_users')
            .select('*')
            .eq('room_id', room.id)
            .eq('user_id', user.id)
            .maybeSingle();

          // Reactivate user participation and restore char
          if (myRow) {
            await supabase
              .from('room_users')
              .update({ is_active: true, last_seen: new Date().toISOString() })
              .eq('id', myRow.id);

            if (myRow.character_body) setSelectedBody(myRow.character_body);
            if (myRow.character_eyes) setSelectedEyes(myRow.character_eyes);
          }

          setRoomId(room.id);
          setRoomCode(room.code);
          setRoomData(room);
          setView('room');
        }
      }

    } catch (e) {
      console.error('Session restore failed:', e);
    } finally {
      setIsRestoringSession(false);
    }
  })();
}, []);

  
  useEffect(() => {
    if (currentUser?.id) {
      localStorage.setItem('user_id', currentUser.id);
      localStorage.setItem('user_name', userName || currentUser.username);
    }
  }, [currentUser?.id, userName]);

  useEffect(() => {
    if (roomId) {
      localStorage.setItem('room_id', roomId);
    } else {
      localStorage.removeItem('room_id');
    }
  }, [roomId]);

  // Hash password
  const hashPassword = (password) => {
    return btoa(password);
  };

  // Signup
  const handleSignup = async () => {
    setAuthError('');

    if (!authUsername.trim() || !authPassword.trim()) {
      setAuthError('Please enter username and password');
      return;
    }

    if (authUsername.length < 3) {
      setAuthError('Username must be at least 3 characters');
      return;
    }

    if (authPassword.length < 8) {
      setAuthError('Password must be at least 8 characters');
      return;
    }

    if (!/\d/.test(authPassword)) {
      setAuthError('Password must contain at least one number');
      return;
    }

    const { data: existing } = await supabase
      .from('users')
      .select('username')
      .eq('username', authUsername)
      .single();

    if (existing) {
      setAuthError('Username already taken');
      return;
    }

    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        username: authUsername,
        password_hash: hashPassword(authPassword),
        total_coins: 0,
        owned_items: FREE_ITEMS
      })
      .select()
      .single();

    if (error) {
      setAuthError('Signup failed');
      console.error(error);
      return;
    }

    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setUserName(newUser.username);
  };

  // Login
  const handleLogin = async () => {
    setAuthError('');

    if (!authUsername.trim() || !authPassword.trim()) {
      setAuthError('Please enter username and password');
      return;
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', authUsername)
      .eq('password_hash', hashPassword(authPassword))
      .single();

    if (error || !user) {
      setAuthError('Invalid username or password');
      return;
    }

    setCurrentUser(user);
    setIsAuthenticated(true);
    setUserName(user.username);
  };

  // Buy item from shop
  const buyItem = async (item) => {
    if (currentUser.total_coins < item.price) {
      alert('Not enough coins!');
      return;
    }

    const newCoins = currentUser.total_coins - item.price;
    const newOwnedItems = [...currentUser.owned_items, item.id];

    // Update coins and items
    const { error } = await supabase
      .from('users')
      .update({
        total_coins: newCoins,
        owned_items: newOwnedItems
      })
      .eq('id', currentUser.id);

    if (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed, please try again.');
      return;
    }


    if (roomId && roomData) {
      const newRoomCoins = Math.max(0, (roomData.coins_earned || 0) - item.price);
      await supabase
        .from('rooms')
        .update({ coins_earned: newRoomCoins })
        .eq('id', roomId);
    }

    setCurrentUser({
      ...currentUser,
      total_coins: newCoins,
      owned_items: newOwnedItems
    });
    setConfirmPurchase(null);
    setShopPreviewItem(null);
    alert('Purchase successful!');
  };

  // Update user's coin count 
  useEffect(() => {
    if (!roomData || !currentUser) return;

    const updateUserCoins = async () => {
      await supabase
        .from('users')
        .update({ total_coins: Math.floor(roomData.coins_earned || 0) })
        .eq('id', currentUser.id);

      const { data: updatedUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    };

    updateUserCoins();
  }, [roomData?.coins_earned, currentUser?.id]);

  // Generate code, create room
  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };


  const createRoom = async () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    const studyMins = parseInt(studyMinutes) || 25;
    const breakMins = parseInt(breakMinutes) || 5;
    const code = generateCode();
    const initialTime = studyMins * 60;

    const { data: room, error } = await supabase
      .from('rooms')
      .insert({
        code: code,
        timer_state: 'stopped',
        timer_seconds_left: initialTime,
        timer_mode: 'study',
        study_duration: studyMins,
        break_duration: breakMins,
        coins_earned: currentUser.total_coins,
        minutes_studied: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room');
      return;
    }

    await supabase
      .from('room_users')
      .insert({
        room_id: room.id,
        user_id: currentUser.id,
        user_name: userName,
        character_body: selectedBody,
        character_eyes: selectedEyes,
        character_eyelashes: selectedEyelashes,
        character_eyebrows: selectedEyebrows,
        character_mouth: selectedMouth,
        character_hair: selectedHair,
        character_hair_2: selectedHair2,
        character_bangs: selectedBangs,
        character_top: selectedTop,
        character_bottom: selectedBottom,
        character_shoes: selectedShoes,
        character_accessories: selectedAccessories
      });

    setRoomId(room.id);
    setRoomCode(code);
    setView('room');
    subscribeToRoom(room.id);
  };

  // Join room, username check
  const joinRoom = async () => {
    if (!userName.trim() || !roomCode.trim()) {
      alert('Please enter your name and room code');
      return;
    }

    const { data: room, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('code', roomCode.toUpperCase())
      .single();

    if (error || !room) {
      alert('Room not found');
      return;
    }

    const { data: existingUsers } = await supabase
      .from('room_users')
      .select('*')
      .eq('room_id', room.id);

    const nameLower = userName.trim().toLowerCase();

    // Only block if an ACTIVE user currently holds this name
    const activeWithName = existingUsers?.find(
      u => u.is_active && u.user_name.toLowerCase() === nameLower
    );
    if (activeWithName) {
      alert(`Username "${userName}" is already taken in this room. Please choose a different name.`);
      return;
    }

    const myStaleRow = existingUsers?.find(
      u => u.user_id === currentUser.id && !u.is_active
    );

    if (myStaleRow) {
      await supabase
        .from('room_users')
        .update({
          is_active: true,
          last_seen: new Date().toISOString(),
          user_name: userName,
          character_body: selectedBody,
          character_eyes: selectedEyes,
          character_eyelashes: selectedEyelashes,
          character_eyebrows: selectedEyebrows,
          character_mouth: selectedMouth,
          character_hair: selectedHair,
          character_hair_2: selectedHair2,
          character_bangs: selectedBangs,
          character_top: selectedTop,
          character_bottom: selectedBottom,
          character_shoes: selectedShoes,
          character_accessories: selectedAccessories
        })
        .eq('id', myStaleRow.id);
    } else {
      await supabase
        .from('room_users')
        .insert({
          room_id: room.id,
          user_id: currentUser.id,
          user_name: userName,
          character_body: selectedBody,
          character_eyes: selectedEyes,
          character_eyelashes: selectedEyelashes,
          character_eyebrows: selectedEyebrows,
          character_mouth: selectedMouth,
          character_hair: selectedHair,
          character_hair_2: selectedHair2,
          character_bangs: selectedBangs,
          character_top: selectedTop,
          character_bottom: selectedBottom,
          character_shoes: selectedShoes,
          character_accessories: selectedAccessories
        });
    }

    setRoomId(room.id);
    setView('room');
    subscribeToRoom(room.id);
  };

  const subscribeToRoom = (roomId) => {
    supabase
      .from('rooms')
      .select('*')
      .eq('id', roomId)
      .single()
      .then(({ data }) => {
        if (data) {
          setRoomData(data);
          setStudyMinutes(String(data.study_duration));
          setBreakMinutes(String(data.break_duration));
        }
      });

    const loadUsers = async () => {
      const { data } = await supabase
        .from('room_users')
        .select('*')
        .eq('room_id', roomId)
        .eq('is_active', true);
      setUsers(data || []);
    };

    loadUsers();
  };

  // Poll room and users every second, filter old heardbeat 
  // always keep users visible
  useEffect(() => {
    if (!roomId) return;

    const pollInterval = setInterval(async () => {
      const { data: roomData } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', roomId)
        .single();

      if (roomData) {
        setRoomData(roomData);
      }

      const { data: userData } = await supabase
        .from('room_users')
        .select('*')
        .eq('room_id', roomId)
        .eq('is_active', true);

      if (userData) {
  
        const now = Date.now();
        const fresh = userData.filter(u => {
          if (u.user_id === currentUser?.id) return true;
          if (!u.last_seen) return true;
          return now - new Date(u.last_seen).getTime() < 30000;
        });
        setUsers(fresh);
      }
    }, 1000);

    return () => clearInterval(pollInterval);
  }, [roomId, currentUser?.id]);

  // Record hearbeat every 10 secs for presence, users see dc
  useEffect(() => {
    if (!roomId || !currentUser?.id) return;

    const writeHeartbeat = async () => {
      try {
        await supabase
          .from('room_users')
          .update({ last_seen: new Date().toISOString() })
          .eq('room_id', roomId)
          .eq('user_id', currentUser.id);
      } catch (e) {
        
      }
    };

    writeHeartbeat(); 
    const heartbeatInterval = setInterval(writeHeartbeat, 10000);
    return () => clearInterval(heartbeatInterval);
  }, [roomId, currentUser?.id]);


  // Timer logic, decrement timer every second
  useEffect(() => {
    if (!roomData || !roomId) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (roomData.timer_state === 'running') {
      timerRef.current = setInterval(async () => {
        const newTime = roomData.timer_seconds_left - 1;

        if (newTime <= 0) {
          const newMode = roomData.timer_mode === 'study' ? 'break' : 'study';
          const newDuration = newMode === 'study' ? roomData.study_duration : roomData.break_duration;
          const newTimerState = newMode === 'break' ? 'running' : 'stopped';

          await supabase
            .from('rooms')
            .update({
              timer_seconds_left: newDuration * 60,
              timer_mode: newMode,
              timer_state: newTimerState
            })
            .eq('id', roomId);
        } else {
          const updates = { timer_seconds_left: newTime };

          if (roomData.timer_mode === 'study') {
            updates.coins_earned = (roomData.coins_earned || 0) + (1 / 60);
            updates.minutes_studied = (roomData.minutes_studied || 0) + (1 / 60);
          }

          await supabase
            .from('rooms')
            .update(updates)
            .eq('id', roomId);
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [roomData, roomId]);


  // Timer start
  const startTimer = async () => {
    await supabase
      .from('rooms')
      .update({ timer_state: 'running' })
      .eq('id', roomId);
  };

  const stopTimer = async () => {
    await supabase
      .from('rooms')
      .update({ timer_state: 'stopped' })
      .eq('id', roomId);
  };

  const updateTimer = async () => {
    const studyMins = parseInt(studyMinutes) || 25;
    const breakMins = parseInt(breakMinutes) || 5;
    const newTime = roomData.timer_mode === 'study' ? studyMins * 60 : breakMins * 60;

    await supabase
      .from('rooms')
      .update({
        study_duration: studyMins,
        break_duration: breakMins,
        timer_seconds_left: newTime
      })
      .eq('id', roomId);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mark user as inactive in current room
  const leaveRoom = async () => {
    if (!roomId || !currentUser?.id) return;
    try {
      await supabase
        .from('room_users')
        .update({ is_active: false })
        .eq('room_id', roomId)
        .eq('user_id', currentUser.id);
    } catch (e) {
      console.error('Failed to leave room cleanly:', e);
    }
  };

  // On tab close, mark the user as having left
  useEffect(() => {
    if (!roomId || !currentUser?.id) return;
    const handler = () => {

      leaveRoom();
    }; 
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [roomId, currentUser?.id]);

  // Autogrant free items
  useEffect(() => {
    if (!currentUser?.id || !currentUser?.owned_items) return;

    const missingFreeItems = FREE_ITEMS.filter(
      id => !currentUser.owned_items.includes(id)
    );
    if (missingFreeItems.length === 0) return;

    const newOwned = [...currentUser.owned_items, ...missingFreeItems];
    (async () => {
      const { error } = await supabase
        .from('users')
        .update({ owned_items: newOwned })
        .eq('id', currentUser.id);
      if (!error) {
        setCurrentUser(u => u ? { ...u, owned_items: newOwned } : u);
      }
    })();
  }, [currentUser?.id]);

  // Update wardrobe selection
  const updateAvatar = async (category, itemId) => {
    const updates = {};
    if (category === 'body') updates.character_body = itemId;
    if (category === 'eyes') updates.character_eyes = itemId;
    if (category === 'eyelashes') updates.character_eyelashes = itemId;
    if (category === 'eyebrows') updates.character_eyebrows = itemId;
    if (category === 'mouth') updates.character_mouth = itemId;
    if (category === 'hair') updates.character_hair = itemId;
    if (category === 'hair_2') updates.character_hair_2 = itemId;
    if (category === 'bangs') updates.character_bangs = itemId;
    if (category === 'tops') updates.character_top = itemId;
    if (category === 'bottoms') updates.character_bottom = itemId;
    if (category === 'shoes') updates.character_shoes = itemId;
    if (category === 'accessories') updates.character_accessories = itemId;

    await supabase
      .from('room_users')
      .update(updates)
      .eq('room_id', roomId)
      .eq('user_id', currentUser.id);

    if (category === 'body') setSelectedBody(itemId);
    if (category === 'eyes') setSelectedEyes(itemId);
    if (category === 'eyelashes') setSelectedEyelashes(itemId);
    if (category === 'eyebrows') setSelectedEyebrows(itemId);
    if (category === 'mouth') setSelectedMouth(itemId);
    if (category === 'hair') setSelectedHair(itemId);
    if (category === 'hair_2') setSelectedHair2(itemId);
    if (category === 'bangs') setSelectedBangs(itemId);
    if (category === 'tops') setSelectedTop(itemId);
    if (category === 'bottoms') setSelectedBottom(itemId);
    if (category === 'shoes') setSelectedShoes(itemId);
    if (category === 'accessories') setSelectedAccessories(itemId);
  };

  // Show loading screen while checking for saved session
  if (isRestoringSession) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Loading...</div>
      </div>
    );
  }

  // login and signup view
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px', color: '#333' }}>
            Mini Haven
          </h1>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
            {authView === 'login' ? 'Welcome back!' : 'Create your account'}
          </p>

          {authError && (
            <div style={{ background: '#fee', border: '1px solid #fcc', padding: '10px', borderRadius: '8px', marginBottom: '15px', color: '#c00' }}>
              {authError}
            </div>
          )}

          <input
            type="text"
            placeholder="Username"
            value={authUsername}
            onChange={(e) => setAuthUsername(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', marginBottom: '15px', fontSize: '16px', boxSizing: 'border-box' }}
          />

          <input
            type="password"
            placeholder="Password"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (authView === 'login' ? handleLogin() : handleSignup())}
            style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', marginBottom: '20px', fontSize: '16px', boxSizing: 'border-box' }}
          />

          {authView === 'signup' && (
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
              Password must be at least 8 characters and contain a number
            </p>
          )}

          <button
            onClick={authView === 'login' ? handleLogin : handleSignup}
            style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: 'bold', padding: '15px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '16px', marginBottom: '15px' }}
          >
            {authView === 'login' ? 'Log In' : 'Sign Up'}
          </button>

          <button
            onClick={() => {
              setAuthView(authView === 'login' ? 'signup' : 'login');
              setAuthError('');
            }}
            style={{ width: '100%', background: 'transparent', color: '#667eea', fontWeight: 'bold', padding: '10px', border: 'none', cursor: 'pointer', fontSize: '14px' }}
          >
            {authView === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    );
  }

  // home view
  if (view === 'home') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', color: '#666' }}>Logged in as</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#667eea' }}>{currentUser.username}</p>
            <p style={{ fontSize: '16px', color: '#f59e0b', fontWeight: 'bold' }}>💰 {Math.floor(currentUser.total_coins)} coins</p>
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px', color: '#333' }}>Study Room</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button onClick={() => setView('create')} style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: 'bold', padding: '15px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Create New Room</button>
            <button onClick={() => setView('join')} style={{ width: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', fontWeight: 'bold', padding: '15px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Join Existing Room</button>
            <button
              onClick={() => {
                localStorage.removeItem('user_id');
                localStorage.removeItem('user_name');
                localStorage.removeItem('username');
                localStorage.removeItem('room_id');
                setIsAuthenticated(false);
                setCurrentUser(null);
                setAuthUsername('');
                setAuthPassword('');
              }}
              style={{ width: '100%', background: '#ddd', color: '#333', fontWeight: 'bold', padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', marginTop: '10px' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // shop
  if (showShop) {
    const categories = [ 'tops', 'bottoms','accessories'];
    const categoryNames = {
      body: 'Body',
      eyes: 'Eyes',
      eyelashes: 'Eyelashes',
      eyebrows: 'Eyebrows',
      mouth: 'Mouth',
      hair: 'Hair',
      hair_2: 'Back Hair',
      bangs: 'Bangs',
      tops: 'Tops',
      bottoms: 'Bottoms',
      shoes: 'Shoes',
      accessories: 'Accessories'
    };

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '30px', maxWidth: '1200px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Shop</h2>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>💰 {Math.floor(currentUser.total_coins)} coins</p>
              <button onClick={() => { setShopPreviewItem(null); setShowShop(false); }} style={{ background: '#ddd', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕ Close</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            {/* Left: Shop items */}
            <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '15px' }}>

          {categories.map(category => {
            const shopItems = CHARACTER_OPTIONS[category].filter(item => !item.free);
            if (shopItems.length === 0) return null;

            return (
              <div key={category} style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '2px solid #667eea', paddingBottom: '10px' }}>
                  {categoryNames[category]}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px' }}>
                  {shopItems.map(item => {
                    const owned = currentUser.owned_items.includes(item.id);
                    const canAfford = currentUser.total_coins >= item.price;
                    const isPreviewing = shopPreviewItem?.item?.id === item.id;

                    return (
                      <div
                        key={item.id}
                        style={{
                          position: 'relative',
                          border: isPreviewing
                            ? '3px solid #9333ea'
                            : owned
                              ? '2px solid #48bb78'
                              : canAfford
                                ? '2px solid #ddd'
                                : '2px solid #fcc',
                          borderRadius: '12px',
                          padding: '10px',
                          background: isPreviewing
                            ? '#f3e8ff'
                            : owned
                              ? '#e6ffed'
                              : canAfford
                                ? 'white'
                                : '#fef2f2',
                          cursor: owned ? 'pointer' : canAfford ? 'pointer' : 'not-allowed',
                          opacity: owned ? 0.6 : 1,
                          transition: 'all 0.2s'
                        }}
                        onClick={() => {

                          if (!canAfford && !owned) return;
                          setShopPreviewItem({ category, item });
                        }}
                        title={owned ? 'Already owned — click to preview' : `Click to preview, then Buy to purchase (${item.price} coins)`}
                      >
                        <div style={{ width: '100px', height: '100px', background: '#f5f5f5', borderRadius: '8px', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                          <img
                            src={`/Images/Character/${category}/${item.file}`}
                            alt={item.name}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.textContent = '📷';
                            }}
                          />
                        </div>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center', marginBottom: '5px' }}>{item.name}</p>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center', color: owned ? '#48bb78' : canAfford ? '#f59e0b' : '#f56565', marginBottom: owned ? 0 : '8px' }}>
                          {owned ? '✓ Owned' : `💰 ${item.price}`}
                        </p>
                        {!owned && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!canAfford) return;
                              setConfirmPurchase(item);
                            }}
                            disabled={!canAfford}
                            style={{
                              width: '100%',
                              padding: '6px',
                              background: canAfford ? '#48bb78' : '#ccc',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: canAfford ? 'pointer' : 'not-allowed',
                              fontWeight: 'bold',
                              fontSize: '12px'
                            }}
                          >
                            Buy
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

            {/* Right: Live Avatar Preview (shop) */}
            <div style={{ position: 'sticky', top: 0 }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
                {shopPreviewItem ? 'Preview' : 'Your Avatar'}
              </h3>
              {(() => {
                const pv = shopPreviewItem;
                const pvId = pv?.item?.id;
                const pvCat = pv?.category;
                const eff = {
                  body: pvCat === 'body' ? pvId : selectedBody,
                  eyes: pvCat === 'eyes' ? pvId : selectedEyes,
                  eyelashes: pvCat === 'eyelashes' ? pvId : selectedEyelashes,
                  eyebrows: pvCat === 'eyebrows' ? pvId : selectedEyebrows,
                  mouth: pvCat === 'mouth' ? pvId : selectedMouth,
                  hair: pvCat === 'hair' ? pvId : selectedHair,
                  hair_2: pvCat === 'hair_2' ? pvId : selectedHair2,
                  bangs: pvCat === 'bangs' ? pvId : selectedBangs,
                  tops: pvCat === 'tops' ? pvId : selectedTop,
                  bottoms: pvCat === 'bottoms' ? pvId : selectedBottom,
                  shoes: pvCat === 'shoes' ? pvId : selectedShoes,
                  accessories: pvCat === 'accessories' ? pvId : selectedAccessories,
                };
                return (
                  <div style={{ position: 'relative', width: '100%', height: '400px', background: '#f0f0f0', borderRadius: '15px', overflow: 'hidden' }}>
                    <img src={`/Images/Character/hair_2/${eff.hair_2}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="back hair" onError={(e) => e.target.style.display = 'none'} />
                    <img src={`/Images/Character/body/${eff.body}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="body" onError={(e) => e.target.style.display = 'none'} />
                    <img src={`/Images/Character/bottoms/${eff.bottoms}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="bottom" onError={(e) => e.target.style.display = 'none'} />
                    <img src={`/Images/Character/tops/${eff.tops}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="top" onError={(e) => e.target.style.display = 'none'} />
                    <img src={`/Images/Character/shoes/${eff.shoes}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="shoes" onError={(e) => e.target.style.display = 'none'} />
                    <img src={`/Images/Character/eyes/${eff.eyes}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyes" onError={(e) => e.target.style.display = 'none'} />
                    <img src={`/Images/Character/eyelashes/${eff.eyelashes}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyelashes" onError={(e) => e.target.style.display = 'none'} />
                    <img src={`/Images/Character/eyebrows/${eff.eyebrows}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyebrows" onError={(e) => e.target.style.display = 'none'} />
                    <img src={`/Images/Character/mouth/${eff.mouth}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="mouth" onError={(e) => e.target.style.display = 'none'} />
                    {eff.bangs && (
                      <img src={`/Images/Character/bangs/${eff.bangs}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="bangs" onError={(e) => e.target.style.display = 'none'} />
                    )}
                    <img src={`/Images/Character/hair/${eff.hair}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="hair" onError={(e) => e.target.style.display = 'none'} />
                    {eff.accessories && (
                      <img src={`/Images/Character/accessories/${eff.accessories}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="accessories" onError={(e) => e.target.style.display = 'none'} />
                    )}
                  </div>
                );
              })()}
              {shopPreviewItem && (
                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                  <p style={{ fontSize: '13px', color: '#666', margin: '0 0 8px 0' }}>
                    Previewing: <strong>{shopPreviewItem.item.name}</strong>
                  </p>
                  <button
                    onClick={() => setShopPreviewItem(null)}
                    style={{ background: '#ddd', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                  >
                    ← Back to your look
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Purchase confirmation */}
        {confirmPurchase && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
            <div style={{ background: 'white', borderRadius: '15px', padding: '30px', maxWidth: '400px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Confirm Purchase</h3>
              <p style={{ marginBottom: '10px' }}>Buy <strong>{confirmPurchase.name}</strong>?</p>
              <p style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>💰 {confirmPurchase.price} coins</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={() => buyItem(confirmPurchase)} style={{ background: '#48bb78', color: 'white', padding: '12px 30px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Yes</button>
                <button onClick={() => setConfirmPurchase(null)} style={{ background: '#ddd', padding: '12px 30px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Wardrobe 
  if (showWardrobe) {
    const categories = ['body', 'eyes', 'eyelashes', 'eyebrows', 'mouth', 'hair', 'hair_2', 'bangs', 'tops', 'bottoms', 'shoes', 'accessories'];
    const categoryNames = {
      body: 'Body',
      eyes: 'Eyes',
      eyelashes: 'Eyelashes',
      eyebrows: 'Eyebrows',
      mouth: 'Mouth',
      hair: 'Hair',
      hair_2: 'Back Hair',
      bangs: 'Bangs',
      tops: 'Tops',
      bottoms: 'Bottoms',
      shoes: 'Shoes',
      accessories: 'Accessories'
    };

    const currentSelections = {
      body: selectedBody,
      eyes: selectedEyes,
      eyelashes: selectedEyelashes,
      eyebrows: selectedEyebrows,
      mouth: selectedMouth,
      hair: selectedHair,
      hair_2: selectedHair2,
      bangs: selectedBangs,
      tops: selectedTop,
      bottoms: selectedBottom,
      shoes: selectedShoes,
      accessories: selectedAccessories
    };

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '30px', maxWidth: '1200px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Wardrobe</h2>
            <button onClick={() => setShowWardrobe(false)} style={{ background: '#ddd', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕ Close</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            {/* Left: Wardrobe items */}
            <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '15px' }}>
              {categories.map(category => {

                const ownedItems = category === 'mouth'
                  ? CHARACTER_OPTIONS[category]
                  : CHARACTER_OPTIONS[category].filter(item => currentUser.owned_items.includes(item.id));
                if (ownedItems.length === 0) return null;

                return (
                  <div key={category} style={{ marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '2px solid #667eea', paddingBottom: '10px' }}>
                      {categoryNames[category]}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px' }}>
                      {ownedItems.map(item => {
                        const isSelected = currentSelections[category] === item.id;

                        return (
                          <div
                            key={item.id}
                            onClick={() => updateAvatar(category, item.id)}
                            style={{
                              border: isSelected ? '3px solid #667eea' : '2px solid #ddd',
                              borderRadius: '12px',
                              padding: '10px',
                              background: isSelected ? '#e8eaf6' : 'white',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ width: '100px', height: '100px', background: '#f5f5f5', borderRadius: '8px', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                              <img
                                src={`/Images/Character/${category}/${item.file}`}
                                alt={item.name}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentNode.textContent = '📷';
                                }}
                              />
                            </div>
                            <p style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>{item.name}</p>
                            {isSelected && <p style={{ fontSize: '12px', textAlign: 'center', color: '#667eea' }}>✓ Equipped</p>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Live Avatar Preview */}
            <div style={{ position: 'sticky', top: 0 }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>Your Avatar</h3>
              <div style={{ position: 'relative', width: '100%', height: '400px', background: '#f0f0f0', borderRadius: '15px', overflow: 'hidden' }}>
                <img src={`/Images/Character/hair_2/${selectedHair2}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="back hair" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/body/${selectedBody}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="body" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/bottoms/${selectedBottom}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="bottom" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/tops/${selectedTop}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="top" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/shoes/${selectedShoes}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="shoes" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/eyes/${selectedEyes}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyes" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/eyelashes/${selectedEyelashes}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyelashes" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/eyebrows/${selectedEyebrows}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyebrows" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/mouth/${selectedMouth}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="mouth" onError={(e) => e.target.style.display = 'none'} />
                {selectedBangs && (
                  <img src={`/Images/Character/bangs/${selectedBangs}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="bangs" onError={(e) => e.target.style.display = 'none'} />
                )}
                <img src={`/Images/Character/hair/${selectedHair}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="hair" onError={(e) => e.target.style.display = 'none'} />
                {selectedAccessories && (
                  <img src={`/Images/Character/accessories/${selectedAccessories}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="accessories" onError={(e) => e.target.style.display = 'none'} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Character Creator
  if (showCharacterCreator) {
    const categories = ['body', 'eyes', 'eyelashes', 'eyebrows', 'mouth', 'hair', 'hair_2', 'bangs', 'tops', 'bottoms', 'shoes'];
    const itemsToShow = currentCategory === 'mouth'
      ? CHARACTER_OPTIONS[currentCategory]
      : CHARACTER_OPTIONS[currentCategory].filter(item => item.free);

    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '30px', maxWidth: '1100px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
            Create Your Study Avatar
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #e0e0e0', paddingBottom: '10px', flexWrap: 'wrap' }}>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setCurrentCategory(category)}
                    style={{
                      padding: '10px 15px',
                      border: 'none',
                      background: currentCategory === category ? '#667eea' : 'transparent',
                      color: currentCategory === category ? 'white' : '#666',
                      fontWeight: currentCategory === category ? 'bold' : 'normal',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      fontSize: '12px'
                    }}
                  >
                    {category === 'hair_2' ? 'Back Hair' : category}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '20px' }}>
                {itemsToShow.map(item => {
                  let isSelected = false;
                  if (currentCategory === 'body') isSelected = selectedBody === item.id;
                  if (currentCategory === 'eyes') isSelected = selectedEyes === item.id;
                  if (currentCategory === 'eyelashes') isSelected = selectedEyelashes === item.id;
                  if (currentCategory === 'eyebrows') isSelected = selectedEyebrows === item.id;
                  if (currentCategory === 'mouth') isSelected = selectedMouth === item.id;
                  if (currentCategory === 'hair') isSelected = selectedHair === item.id;
                  if (currentCategory === 'hair_2') isSelected = selectedHair2 === item.id;
                  if (currentCategory === 'bangs') isSelected = selectedBangs === item.id;
                  if (currentCategory === 'tops') isSelected = selectedTop === item.id;
                  if (currentCategory === 'bottoms') isSelected = selectedBottom === item.id;
                  if (currentCategory === 'shoes') isSelected = selectedShoes === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (currentCategory === 'body') setSelectedBody(item.id);
                        if (currentCategory === 'eyes') setSelectedEyes(item.id);
                        if (currentCategory === 'eyelashes') setSelectedEyelashes(item.id);
                        if (currentCategory === 'eyebrows') setSelectedEyebrows(item.id);
                        if (currentCategory === 'mouth') setSelectedMouth(item.id);
                        if (currentCategory === 'hair') setSelectedHair(item.id);
                        if (currentCategory === 'hair_2') setSelectedHair2(item.id);
                        if (currentCategory === 'bangs') setSelectedBangs(item.id);
                        if (currentCategory === 'tops') setSelectedTop(item.id);
                        if (currentCategory === 'bottoms') setSelectedBottom(item.id);
                        if (currentCategory === 'shoes') setSelectedShoes(item.id);
                      }}
                      style={{
                        padding: '10px',
                        border: isSelected ? '3px solid #667eea' : '2px solid #ddd',
                        borderRadius: '12px',
                        background: isSelected ? '#e8eaf6' : 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ width: '80px', height: '80px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                        <img
                          src={`/Images/Character/${currentCategory}/${item.file}`}
                          alt={item.name}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.textContent = '📷';
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 'bold' }}>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>Preview</h3>
              <div style={{ position: 'relative', width: '100%', height: '400px', background: '#f0f0f0', borderRadius: '15px', overflow: 'hidden', marginBottom: '20px' }}>
                <img src={`/Images/Character/hair_2/${selectedHair2}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="back hair" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/body/${selectedBody}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="body" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/bottoms/${selectedBottom}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="bottom" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/tops/${selectedTop}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="top" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/shoes/${selectedShoes}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="shoes" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/eyes/${selectedEyes}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyes" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/eyelashes/${selectedEyelashes}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyelashes" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/eyebrows/${selectedEyebrows}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyebrows" onError={(e) => e.target.style.display = 'none'} />
                <img src={`/Images/Character/mouth/${selectedMouth}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="mouth" onError={(e) => e.target.style.display = 'none'} />
                {selectedBangs && (
                  <img src={`/Images/Character/bangs/${selectedBangs}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="bangs" onError={(e) => e.target.style.display = 'none'} />
                )}
                <img src={`/Images/Character/hair/${selectedHair}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="hair" onError={(e) => e.target.style.display = 'none'} />
              </div>

              <button
                onClick={() => setShowCharacterCreator(false)}
                style={{
                  width: '100%',
                  background: '#667eea',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '15px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ✓ Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Room creation view
  if (view === 'create') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Create Room</h2>

          <button
            onClick={() => setShowCharacterCreator(true)}
            style={{
              width: '100%',
              background: '#764ba2',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}
          >
            Customize Avatar
          </button>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Study Time (minutes)</label>
            <input
              type="number"
              value={studyMinutes}
              onChange={(e) => setStudyMinutes(e.target.value)}
              placeholder="25"
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Break Time (minutes)</label>
            <input
              type="number"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(e.target.value)}
              placeholder="5"
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={createRoom}
              style={{ width: '100%', background: '#667eea', color: 'white', fontWeight: 'bold', padding: '15px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
            >
              Create Room
            </button>
            <button
              onClick={() => setView('home')}
              style={{ width: '100%', background: '#ddd', color: '#333', fontWeight: 'bold', padding: '15px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Join room view
  if (view === 'join') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Join Room</h2>

          <button
            onClick={() => setShowCharacterCreator(true)}
            style={{
              width: '100%',
              background: '#764ba2',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}
          >
             Customize Avatar
          </button>

          <input
            type="text"
            placeholder="Enter room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', marginBottom: '20px', fontSize: '16px', textTransform: 'uppercase', boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={joinRoom}
              style={{ width: '100%', background: '#f5576c', color: 'white', fontWeight: 'bold', padding: '15px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
            >
              Join Room
            </button>
            <button
              onClick={() => setView('home')}
              style={{ width: '100%', background: '#ddd', color: '#333', fontWeight: 'bold', padding: '15px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main interface 
  if (view === 'room' && roomData) {
    const currentRoomUser = users.find(user => user.user_id === currentUser.id);

    return (
      <div style={{ minHeight: '100vh', background: '#f7fafc', padding: '20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Study Room</h1>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Room Code</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea', margin: 0, fontFamily: 'monospace' }}>{roomCode}</p>
                </div>
                <button
                  onClick={() => setShowWardrobe(true)}
                  disabled={roomData.timer_state === 'running' && roomData.timer_mode === 'study'}
                  style={{
                    background: (roomData.timer_state === 'running' && roomData.timer_mode === 'study') ? '#ccc' : '#667eea',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: (roomData.timer_state === 'running' && roomData.timer_mode === 'study') ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Wardrobe
                </button>
                <button
                  onClick={() => setShowShop(true)}
                  disabled={roomData.timer_state === 'running' && roomData.timer_mode === 'study'}
                  style={{
                    background: (roomData.timer_state === 'running' && roomData.timer_mode === 'study') ? '#ccc' : '#f59e0b',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: (roomData.timer_state === 'running' && roomData.timer_mode === 'study') ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Shop
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px', marginBottom: '20px' }}>

            <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Collaborators ({users.length})</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {users.map((user) => (
                  <div key={user.id} style={{ background: '#d4edda', borderLeft: '4px solid #28a745', padding: '10px', borderRadius: '5px' }}>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{user.user_name}</p>
                    <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Active</p>
                  </div>
                ))}
                {users.length < 2 && (
                  <div style={{ background: '#f0f0f0', borderLeft: '4px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <p style={{ fontWeight: 'bold', color: '#999', margin: 0 }}>Waiting...</p>
                    <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>~ Share the code ~</p>
                  </div>
                )}
              </div>

              {/* Whiteboard Button */}
              <button
                onClick={() => setShowWhiteboard(true)}
                style={{
                  width: '100%',
                  marginTop: '20px',
                  background: '#9333ea',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '15px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                 Whiteboard
              </button>

              {/* Logout Button */}
              <button
                onClick={async () => {
                  await leaveRoom();
                  localStorage.removeItem('user_id');
                  localStorage.removeItem('user_name');
                  localStorage.removeItem('username');
                  localStorage.removeItem('room_id');
                  window.location.reload();
                }}
                style={{
                  width: '100%',
                  marginTop: '10px',
                  background: '#ef4444',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '15px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Log Out
              </button>
            </div>

            <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                {roomData.timer_mode === 'study' ? 'Study Time' : 'Break Time'}
              </h2>
              <div style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '20px', color: roomData.timer_mode === 'study' ? '#667eea' : '#48bb78' }}>
                {formatTime(roomData.timer_seconds_left)}
              </div>

              {!roomData || roomData.timer_state !== 'running' ? (
                <div style={{ marginBottom: '15px', width: '100%' }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px' }}>Study (min)</label>
                      <input type="number" value={studyMinutes} onChange={(e) => setStudyMinutes(e.target.value)} min="1" style={{ width: '100%', padding: '8px', border: '2px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px' }}>Break (min)</label>
                      <input type="number" value={breakMinutes} onChange={(e) => setBreakMinutes(e.target.value)} min="1" style={{ width: '100%', padding: '8px', border: '2px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <button onClick={updateTimer} style={{ width: '100%', padding: '8px', background: '#718096', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', marginBottom: '10px' }}>Update Timer</button>
                </div>
              ) : null}

              <div style={{ display: 'flex', gap: '15px' }}>
                {roomData.timer_state !== 'running' ? (
                  <button onClick={startTimer} style={{ background: '#48bb78', color: 'white', fontWeight: 'bold', padding: '12px 30px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Start</button>
                ) : (
                  <button onClick={stopTimer} style={{ background: '#f56565', color: 'white', fontWeight: 'bold', padding: '12px 30px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Stop</button>
                )}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {currentRoomUser && (
                <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px' }}>
                  <img src={`/Images/Character/hair_2/${currentRoomUser.character_hair_2 || 'Hair_2-1'}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="back hair" onError={(e) => e.target.style.display = 'none'} />
                  <img src={`/Images/Character/body/${currentRoomUser.character_body || 'body-1'}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="body" onError={(e) => e.target.style.display = 'none'} />
                  <img src={`/Images/Character/bottoms/${currentRoomUser.character_bottom || 'Bottom-1'}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="bottom" onError={(e) => e.target.style.display = 'none'} />
                  <img src={`/Images/Character/tops/${currentRoomUser.character_top || 'top-1'}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="top" onError={(e) => e.target.style.display = 'none'} />
                  <img src={`/Images/Character/shoes/${currentRoomUser.character_shoes || 'shoes-1'}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="shoes" onError={(e) => e.target.style.display = 'none'} />
                  <img src={`/Images/Character/eyes/${currentRoomUser.character_eyes || 'eye-black'}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyes" onError={(e) => e.target.style.display = 'none'} />
                  <img src={`/Images/Character/eyelashes/${currentRoomUser.character_eyelashes || 'el-1'}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyelashes" onError={(e) => e.target.style.display = 'none'} />
                  <img src={`/Images/Character/eyebrows/${currentRoomUser.character_eyebrows || 'eb-1'}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="eyebrows" onError={(e) => e.target.style.display = 'none'} />
                  <img src={`/Images/Character/mouth/${currentRoomUser.character_mouth || '6'}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="mouth" onError={(e) => e.target.style.display = 'none'} />
                  {currentRoomUser.character_bangs && (
                    <img src={`/Images/Character/bangs/${currentRoomUser.character_bangs}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="bangs" onError={(e) => e.target.style.display = 'none'} />
                  )}
                  <img src={`/Images/Character/hair/${currentRoomUser.character_hair || 'Hair-1'}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="hair" onError={(e) => e.target.style.display = 'none'} />
                  {currentRoomUser.character_accessories && (
                    <img src={`/Images/Character/accessories/${currentRoomUser.character_accessories}.png`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }} alt="accessories" onError={(e) => e.target.style.display = 'none'} />
                  )}
                </div>
              )}
            </div>

          </div>

          <div style={{ background: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Session Stats</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Minutes Studied</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea', margin: 0 }}>
                  {Math.floor(roomData.minutes_studied || 0)}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Coins Earned</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>
                  {Math.floor(roomData.coins_earned || 0)}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Status</p>
                <p style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: roomData.timer_state === 'running' ? '#48bb78' : '#a0aec0',
                  margin: 0
                }}>
                  {roomData.timer_state === 'running' ? 'Active' : 'Paused'}
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '15px', padding: '15px', textAlign: 'center', color: '#666', fontSize: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            Users shall earn one coin for one minute of study
          </div>
        </div>

        {/* WHITEBOARD */}
        {showWhiteboard && (
          <WhiteboardModal
            roomId={roomId}
            roomData={roomData}
            onClose={() => setShowWhiteboard(false)}
          />
        )}
      </div>
    );
  }

  return null;
}

export default App;