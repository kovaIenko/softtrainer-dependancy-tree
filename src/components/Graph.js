import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3-force'; // Import the d3-force module


const Graph = ({ data }) => {
    const graphRef = useRef();

    useEffect(() => {
        const fg = graphRef.current;
        fg.d3Force('charge').strength(-300);

        // Fix root node (id = 1) at the center
        fg.d3Force('center', d3.forceCenter(0, 0)); // Center the graph
        fg.d3Force('x', d3.forceX().strength(0.5)); // Add a weak force pulling nodes to center
        fg.d3Force('y', d3.forceY().strength(0.5));

        // Lock the root node at its initial position
        fg.d3Force('link').distance(link => link.source.id === 1 || link.target.id === 1 ? 100 : 30);
    }, []);

    const getNodeColor = (messageType) => {
        const colors = {
            'Text': 'rgba(255, 0, 0, 0.3)',                // Red for Text
            'Image': 'rgba(0, 255, 0, 0.3)',               // Green for Image
            'Video': 'rgba(0, 0, 255, 0.3)',               // Blue for Video
            'Audio': 'rgba(255, 255, 0, 0.3)',             // Yellow for Audio
            'SingleChoiceQuestion': 'rgba(0, 128, 128, 0.3)', // Teal for SingleChoiceQuestion
            'MultiChoiceTask': 'rgba(255, 165, 0, 0.3)',    // Orange for MultiChoiceTask
            'HintMessage': 'rgba(128, 128, 0, 0.3)',        // Olive for HintMessage
            'ResultSimulation': 'rgba(128, 0, 128, 0.3)',   // Purple for ResultSimulation
        };
        return colors[messageType] || 'rgba(150, 150, 150, 0.3)'; // Grey for unknown types
    };

    const graphData = {
        nodes: data.map(item => ({
            id: item.message_id,
            name: `Message ${item.message_id}`,
            message_type: item.message_type,
            text: item.text,
            val: 20, // Fixed node size
            fx: item.message_id === 1 ? 0 : null, // Fix x position for root node
            fy: item.message_id === 1 ? 0 : null  // Fix y position for root node
        })),
        links: data.flatMap(item =>
            (item.previous_message_id || []).map(prevId => ({
                source: prevId,
                target: item.message_id
            }))
        )
    };

    const nodeCanvasObject = (node, ctx, globalScale) => {
        const label = `ID: ${node.id}\nType: ${node.message_type}`;
        const fontSize = 10 / globalScale; // Scale font size based on zoom level
        ctx.font = `${fontSize}px Sans-Serif`;

        // Draw a circular background (bubble)
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
        ctx.fillStyle = getNodeColor(node.message_type);
        ctx.fill();

        // Draw the node border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw node label
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText(label, node.x, node.y);
    };

    return (
        <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeLabel="name"
            nodeCanvasObject={nodeCanvasObject}
            nodeCanvasObjectMode={() => 'replace'}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            enableNodeDrag={true}
            cooldownTicks={100}
            onEngineStop={() => graphRef.current.zoomToFit(400)}
        />
    );
};

export default Graph;
