import { Dropdown } from './Dropdown'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';


it("renders without crashing", () => {
    render(<Dropdown activeIndex={0} onItemClick={() => {}} values={["1", "2"]}/>);
});

it("custom renderer called", () => {
    render(<Dropdown activeIndex={-1} onItemClick={() => {}} values={["1", "2"]} renderer={( val ) => {
        return <div>{val}_ok</div>
    }}/>);
    screen.getByText("1_ok")
    screen.getByText("2_ok")
});

it('custom active renderer called', () => {
    render(<Dropdown 
        activeIndex={0} 
        onItemClick={() => {}} 
        values={["1", "2"]} 
        renderer={( val ) => {
            return <div>{val}_ok</div>
        }}
        activeRenderer={(val) => {
            return <div>{val}_active</div>
        }}
    />);
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
