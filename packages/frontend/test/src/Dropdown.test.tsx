import { Dropdown } from './Dropdown'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';


it("renders without crashing", () => {
    render(<Dropdown activeIndex={0} onItemClick={() => {}} values={["1", "2"]}/>);
});

it("custom renderer called", () => {
    let count = 0
    render(<Dropdown activeIndex={-1} onItemClick={() => {}} values={["1", "2"]} renderer={( val ) => {
        count++
        return <div>{val}_ok</div>
    }}/>);
    expect(count).toEqual(2)
    screen.getByText("1_ok")
    screen.getByText("2_ok")
});

it('custom active renderer called', () => {
    let renderCount = 0
    let activeRenderCount = 0
    render(<Dropdown 
        activeIndex={0} 
        onItemClick={() => {}} 
        values={["1", "2"]} 
        renderer={( val ) => {
            renderCount++
            return <div>{val}_ok</div>
        }}
        activeRenderer={(val) => {
            activeRenderCount++
            return <div>{val}_active</div>
        }}
    />);
    /// 2 items, so should be called twice
    expect(renderCount).toEqual(2)
    expect(activeRenderCount).toEqual(2)
    screen.getByText("1_active")
    screen.getByText("2_ok")

    render(<Dropdown 
        activeIndex={1} 
        onItemClick={() => {}} 
        values={["1", "2"]} 
        renderer={( val ) => {
            return <div>{val}_ok</div>
        }}
        activeRenderer={(val) => {
            return <div>{val}_active</div>
        }}
    />);
    screen.getByText("1_ok")
    screen.getByText("2_active")
})

 
it('selected display custom styles injected', () => {
    render(<Dropdown selectedDisplayStyles={{
        backgroundColor: 'red',
    }} activeIndex={-1} onItemClick={() => {}} values={["1", "2"]} renderer={( val ) => {
        return <div>{val}_ok</div>
    }}/>);

    expect(screen.getByTestId("selected-display").style).toHaveProperty('backgroundColor', 'red')
})
